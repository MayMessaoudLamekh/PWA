import { requireUser } from "@/lib/session";

// MODULE: User Management
// Action: updateProfile(state, formData) → src/features/users/actions.ts
// Fields: name, phone
// TODO (UI): profile form
export default async function ProfilePage() {
  const user = await requireUser();
  return <h1>Profile — {user.email}</h1>;
}
