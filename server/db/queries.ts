import db from "./pool";

export const getUserById = async (id: number) => {
  const { rows } = await db.query(`select * from users where id=$1`, [id]);
  return rows;
}
