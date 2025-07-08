import { readConfig } from "src/config";
import { createFeedFollow, getFeedByUrl } from "src/db/queries/feeds";
import { getUser } from "src/db/queries/users";

export async function handlerFollow(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw new Error("follow command requires feed url parameter");
  }

  const { currentUserName } = readConfig();
  const currentUser = await getUser(currentUserName);
  const feed = await getFeedByUrl(args[0]);

  const response = await createFeedFollow(feed.id, currentUser.id);
  console.log(`${currentUserName} is now following ${response.feeds.name}`);
}
