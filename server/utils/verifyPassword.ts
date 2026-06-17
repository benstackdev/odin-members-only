import bcrypt from "bcrypt";

export const verifyPassword = (plaintext: string, hash: string) => {
  return new Promise<boolean>((resolve, reject) => {
    bcrypt.compare(plaintext, hash, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};