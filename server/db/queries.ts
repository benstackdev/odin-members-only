import db from "./pool";

export const getUserById = async (id: number) => {
  const { rows } = await db.query(`select * from users where id=$1`, [id]);
  return rows[0]; // returns first result
}

export const getUserByUsername = async (username: string) => {
  const { rows } = await db.query(`select * from users where username=$1`, [username]);
  return rows[0]; // returns first result
}
