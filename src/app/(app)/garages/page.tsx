import { requireUser } from "@/lib/session";

// MODULE: Garage Management
// Data:    listGarages(search?)  → src/features/garages/queries.ts
// Actions: createGarage, updateGarage, deleteGarage (admin only) → src/features/garages/actions.ts
// TODO (UI): search, garage list, admin form, map link (latitude/longitude)
export default async function GaragesPage() {
  await requireUser();
  return <h1>Garages</h1>;
}
