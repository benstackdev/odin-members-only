import { UserType } from "../types/UserType.type";
import db from "./pool";

export const getUserById = async (id: number) => {
  const { rows } = await db.query(`select * from users where id=$1`, [id]);
  return rows[0]; // returns first result
};

export const getUserByUsername = async (username: string) => {
  const { rows } = await db.query(`select * from users where username=$1`, [username]);
  return rows[0]; // returns first result
};

// For signup, need to check if user already exists
export const postNewUser = async (newUser: UserType) => {
  await db.query(
    `insert into users (username, password) values ($1, $2)`,
    [newUser.username, newUser.password]);
};

export const getAllMessages = async () => {
  const { rows } = await db.query(`select * from messages order by posted desc`);
  return rows;
};