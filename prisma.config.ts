import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    // MongoDB has no migrations — this is only used by `prisma db seed`.
    seed: "tsx prisma/seed.ts",
  },
});
