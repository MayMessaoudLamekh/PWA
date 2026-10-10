import { requireUser } from "@/lib/session";

// MODULE: Insurance Management
// Data:    listInsurances(user.id)     → src/features/insurance/queries.ts
//          listCarOptions(user.id)     → src/features/cars/queries.ts (car <select>)
// Status:  insuranceStatus(endDate)    → src/features/insurance/status.ts
// Actions: createInsurance, deleteInsurance → src/features/insurance/actions.ts
// TODO (UI): policy form + policies list
export default async function InsurancePage() {
  await requireUser();
  return <h1>Insurance</h1>;
}
