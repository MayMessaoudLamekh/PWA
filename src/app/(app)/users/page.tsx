import { requireAdmin } from "@/lib/session";

// MODULE: User Management (admin only)
// Data:    listUsers() → src/features/users/queries.ts
// Actions: changeUserRole, deleteUser → src/features/users/actions.ts
// TODO (UI): users table
export default async function UsersPage() {
  await requireAdmin();
  return <h1>Users</h1>;
}
