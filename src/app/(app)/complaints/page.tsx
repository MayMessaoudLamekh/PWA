import { requireUser } from "@/lib/session";

// MODULE: Complaints Management
// Data:    listComplaints(user, status?) → src/features/complaints/queries.ts (admins see all)
//          listCarOptions / listGarageOptions for the related car / garage <select>s
// Actions: createComplaint (user), respondToComplaint (admin), deleteComplaint
//          → src/features/complaints/actions.ts
// TODO (UI): complaint form (users), list with status filter, admin response form
export default async function ComplaintsPage() {
  await requireUser();
  return <h1>Complaints</h1>;
}
