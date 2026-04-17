const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const siteConfig = {
  title: "Next Supabase SaaS Starter", 
  description: "A starter kit for building SaaS products with Next.js, Supabase, and Stripe", 
  siteUrl 
};

export type SiteConfig = typeof siteConfig;