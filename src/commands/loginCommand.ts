import { setUser } from "src/config";

export function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw new Error("Login command requires user name argument");
  }

  const userName = args[0];

  setUser(userName);
  console.log(`Current user has been set to '${userName}'`);
}
