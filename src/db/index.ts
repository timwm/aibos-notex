// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from "dotenv";

import * as schema from "./schema";

config({ path: ".env.local" }); // or .env.local

// const sql = neon(process.env.DATABASE_URL!);
// export const db = drizzle({ client: sql, schema });
const sql = postgres(process.env.DATABASE_URL!);

export const db = drizzle({ client: sql, schema });
