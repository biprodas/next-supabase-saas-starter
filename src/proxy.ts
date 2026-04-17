import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

// Auth routes that don't require authentication
const AUTH_ROUTES = [
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/accept-invitation',
];

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/',
  '/policy',
  '/terms',
  '/solutions',
  '/pricing',
  '/logout',
  '/auth/callback',
];

/**
 * Check if a path matches any of the given route patterns
 */
function isRouteMatch(pathname: string, routes: string[]): boolean {
  return routes.some(route => pathname === route || pathname.startsWith(`${route}/`));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files, API routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|css|js|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request,
  });

  // Track cookies that need to be preserved on redirects
  const cookiesToPreserve: Array<{ name: string; value: string; options?: any }> = [];

  // Create Supabase client for middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
            cookiesToPreserve.push({ name, value, options });
          });
        },
      },
    }
  );

  // Refresh the auth token and get current user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  const isAuthenticated = !!user && !authError;
  const isAcceptInvitationRoute = pathname === '/accept-invitation' || pathname.startsWith('/accept-invitation/');
  const isAuthRoute = isRouteMatch(pathname, AUTH_ROUTES);
  const isPublicRoute = isRouteMatch(pathname, PUBLIC_ROUTES);

  // Accept-invitation is always accessible (with or without auth); no redirect
  if (isAcceptInvitationRoute) {
    return response;
  }

  // If user is not authenticated
  if (!isAuthenticated) {
    // Allow access to auth routes, public routes, and signup
    if (isAuthRoute || isPublicRoute) {
      return response;
    }

    // Redirect to login for all other routes (preserve full URL including search params for redirect back)
    const loginUrl = new URL('/login', request.url);
    const redirectBack = pathname + request.nextUrl.search;
    loginUrl.searchParams.set('redirect', redirectBack);
    const redirectResponse = NextResponse.redirect(loginUrl);
    // Preserve cookie updates from session refresh
    cookiesToPreserve.forEach(({ name, value, options }) => {
      redirectResponse.cookies.set(name, value, options);
    });
    return redirectResponse;
  }

  // If user is trying to access auth routes (except accept-invitation, already allowed above), redirect them
  if (isAuthRoute) {
    const redirectUrl =  '/dashboard';
    const redirectResponse = NextResponse.redirect(new URL(redirectUrl, request.url));
    // Preserve cookie updates from session refresh
    cookiesToPreserve.forEach(({ name, value, options }) => {
      redirectResponse.cookies.set(name, value, options);
    });
    return redirectResponse;
  }

  // Allow access
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
