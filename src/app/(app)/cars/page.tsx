import { requireUser } from "@/lib/session";

// MODULE: Car Management
// Data: listCars(user.id) → src/features/cars/queries.ts
// TODO (UI): list of the user's cars + link to /cars/new
export default async function CarsPage() {
  await requireUser();
  return <h1>My cars</h1>;
}
