import { ThemeToggleButton } from "~/components/theme-toggle-button";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <div className="fixed right-4 top-4 z-50">
        <ThemeToggleButton />
      </div>
      {children}
    </div>
  );
}
