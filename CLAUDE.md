# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev                  # Start Next.js dev server

# Email templates
npm run email:dev            # Preview email templates locally
npm run email:build          # Build email templates
npm run email:export         # Export email templates

# Stripe
npm run stripe:listen        # Listen for Stripe webhooks locally

# Supabase
npm run supabase:login       # Login to Supabase CLI
npm run supabase:link        # Link to remote Supabase project

# Database
npm run db:new               # Create a new migration
npm run db:push              # Push migrations to database
npm run db:pull              # Pull remote schema
npm run db:reset             # Reset local database
npm run db:squash            # Squash all migrations into one
npm run db:seed              # Seed the database
npm run db:deploy            # Push DB + generate types (for production)

# TypeScript types from Supabase schema
npm run types:gen            # Generate TypeScript types from Supabase schema
```

## Architecture

### Route Groups

The app uses three Next.js route groups:

- `src/app/(main)/` — Public marketing site (landing page, pricing, etc.)
- `src/app/(auth)/` — Authentication pages (login, signup, forgot/reset password, verify email)
- `src/app/(dashboard)/` — Protected user area (dashboard, profile, settings)
- `src/app/(playground)/` — Dev playground (design system preview)

### Authentication

Auth is handled entirely by Supabase Auth with the `@supabase/ssr` package:

- **Server actions** live in `src/app/(auth)/actions.ts`: `login`, `register`, `signInWithGoogle`, `resetPassword`, `logout`
- **OAuth callback** at `src/app/auth/callback/route.ts` exchanges the code for a session and auto-creates a user profile for new OAuth users
- **Middleware** in `src/proxy.ts` (referenced by `middleware.ts`) protects routes using `supabase.auth.getClaims()`, redirecting unauthenticated users to `/login` and authenticated users away from auth pages to `/dashboard`

Public routes that bypass auth: `/`, `/policy`, `/terms`, `/solutions`, `/pricing`, `/logout`, `/auth/callback`

Auth-only routes (redirect to dashboard if authenticated): `/login`, `/signup`, `/forgot-password`, `/reset-password`, `/verify-email`, `/accept-invitation`

### Supabase Clients

Two clients for different rendering contexts:

- `src/lib/supabase/client.ts` — Browser client (client components), uses `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `src/lib/supabase/server.ts` — Server client (server components, actions, route handlers), manages cookies for session persistence
- `src/lib/supabase/proxy.ts` — `updateSession()` for middleware cookie refresh

### Database Schema

Managed via migrations in `supabase/migrations/`:

- `profiles` table — Created automatically on user signup via `create_profile_on_signup()` trigger. Fields: `id`, `full_name`, `email`, `phone`, `avatar_url`, `status` (enum: pending/active/inactive/blocked)
- `avatars` storage bucket — Public bucket for user avatars, RLS restricts each user to `{user_id}/avatar`
- RLS auto-enabled on all new tables via `rls_auto_enable()` event trigger
- TypeScript types auto-generated into `src/lib/supabase/types.ts` via `npm run types:gen`

### Import Alias

Use `~/` to import from `src/`. Example: `import { cn } from "~/lib/utils"`.

### Key Libraries

- **UI**: shadcn/ui components in `src/components/ui/`, Tailwind CSS 4, Radix UI primitives
- **Theming**: `next-themes` via `src/providers/theme-provider.tsx`; toggle components in `src/components/`
- **Server state**: TanStack React Query via `src/providers/react-query-provider.tsx`
- **Email**: Resend client in `src/lib/resend.ts`
- **Utilities**: `cn()` in `src/lib/utils.ts` (clsx + tailwind-merge)

### Configuration

- `src/config/site.ts` — Site metadata, URLs, author info
- `src/config/routes.ts` — Centralized route and API path constants
- `src/config/constants.ts` — Support email, external URLs
- `src/config/index.ts` — Barrel export for all config

### Environment Variables

See `.env.example` for all required variables:
- `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — required for all Supabase access
- `SUPABASE_SERVICE_ROLE_KEY` — server-only privileged access
- `RESEND_API_KEY` + `RESEND_FROM_EMAIL` — transactional email
- `NEXT_PUBLIC_APP_URL` — used for OAuth redirects and canonical URLs
