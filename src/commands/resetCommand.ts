import { resetUsers } from "src/db/queries/users";

export async function handlerReset(cmdName: string, ...args: string[]) {
  await resetUsers();
  console.log("Users reset!");
}
