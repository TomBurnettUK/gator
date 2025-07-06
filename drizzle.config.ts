import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "src/db/schema.ts",
  out: "drizzle/",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgres://postgres:postgres@localhost:5432/gator?sslmode=disable",
  },
});
