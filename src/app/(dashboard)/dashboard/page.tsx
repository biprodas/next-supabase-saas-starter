import { UserButton } from "~/app/(auth)/_components/user-button";
export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-xl font-bold p-3">Dashboard</h1>
      <UserButton />
    </div>
  );
}
