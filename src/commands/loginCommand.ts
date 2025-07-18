import { setUser } from "src/config";
import { getUser } from "src/db/queries/users";

export async function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw new Error("Login command requires user name argument");
  }

  const userName = args[0];
  const user = await getUser(userName);

  if (!user) {
    throw new Error("User does not exist (register first)");
  }

  setUser(userName);
  console.log(`Current user has been set to '${userName}'`);
}
