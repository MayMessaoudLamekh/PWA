import { notFound } from "next/navigation";
import { getGarage } from "@/features/garages/queries";
import { requireAdmin } from "@/lib/session";

// MODULE: Garage Management (admin only)
// Action: updateGarage.bind(null, garageId) → src/features/garages/actions.ts
// TODO (UI): garage form with default values
export default async function EditGaragePage({ params }: PageProps<"/garages/[garageId]/edit">) {
  await requireAdmin();
  const { garageId } = await params;
  const garage = await getGarage(garageId);
  if (!garage) notFound();

  return <h1>Edit {garage.name}</h1>;
}
