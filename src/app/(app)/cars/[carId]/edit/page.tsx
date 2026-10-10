import { notFound } from "next/navigation";
import { getCar } from "@/features/cars/queries";
import { requireUser } from "@/lib/session";

// MODULE: Car Management
// Action: updateCar.bind(null, carId) → src/features/cars/actions.ts
// TODO (UI): reuse the car form with default values
export default async function EditCarPage({ params }: PageProps<"/cars/[carId]/edit">) {
  const { carId } = await params;
  const user = await requireUser();
  const car = await getCar(user.id, carId);
  if (!car) notFound();

  return <h1>Edit {car.brand} {car.model}</h1>;
}
