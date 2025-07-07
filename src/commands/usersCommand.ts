import { readConfig } from "src/config";
import { getUsers } from "src/db/queries/users";

export async function handlerUsers(cmdName: string, ...args: string[]) {
  const users = await getUsers();
  const { currentUserName } = readConfig();

  for (const user of users) {
    if (user.name === currentUserName) {
      console.log(`* ${user.name} (current)`);
    } else {
      console.log(`* ${user.name}`);
    }
  }
}
