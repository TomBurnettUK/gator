import { readConfig } from "src/config";
import { getFeedFollowsForUser } from "src/db/queries/feeds";
import { getUser } from "src/db/queries/users";

export async function handlerFollowing(cmdName: string, ...args: string[]) {
  const { currentUserName } = readConfig();
  const currentUser = await getUser(currentUserName);

  const response = await getFeedFollowsForUser(currentUser.id);

  console.log(`${currentUserName} is following:`);
  for (const data of response) {
    console.log(data.feeds.name);
  }
}
