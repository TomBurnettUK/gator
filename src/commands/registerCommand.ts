import { setUser } from "src/config";
import { createUser } from "src/db/queries/users";

export async function handlerRegister(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw new Error("Register command requires user name argument");
  }

  const userName = args[0];
  const user = await createUser(userName);

  setUser(user.name);
  console.log(`Current user has been set to '${userName}'`);
}
