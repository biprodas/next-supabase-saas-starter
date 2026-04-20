const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const siteConfig = {
  title: "Next Supabase SaaS Starter", 
  description: "A starter kit for building SaaS products with Next.js, Supabase, and Stripe", 
  siteUrl: APP_URL,
  apiBaseUrl: API_BASE_URL,
  robots: "noindex, nofollow",
  author: {
    name: "Biprodas Roy",
    website: "#",
  },
  links: {
    linkedIn: "#",
    github: "#",
  },
};

export type SiteConfig = typeof siteConfig;