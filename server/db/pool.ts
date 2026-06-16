import { Pool } from "pg";

const db = new Pool({
  connectionString: "postgresql://ben:@localhost:5432/odin_members_only"
});

export default db
