import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { readConfig } from "../config";
import * as schema from "./schema";

const config = readConfig();
const connection = postgres(config.dbUrl);
export const db = drizzle(connection, { schema });
