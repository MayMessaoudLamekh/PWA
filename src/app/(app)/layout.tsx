import { requireUser } from "@/lib/session";

// Layout for every logged-in page. Redirects to /login if not authenticated.
// Navigation links are in src/config/navigation.ts.
// Logout: the `logout` server action in src/features/users/actions.ts.
// TODO (UI): sidebar + topbar in src/components/layout/
export default async function AppLayout({ children }: LayoutProps<"/">) {
  await requireUser();
  return <main>{children}</main>;
}
