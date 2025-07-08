import { createFeedFollow, getFeedByUrl } from "src/db/queries/feeds";
import { User } from "src/db/schema";

export async function handlerFollow(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  if (args.length === 0) {
    throw new Error("follow command requires feed url parameter");
  }

  const feed = await getFeedByUrl(args[0]);

  const response = await createFeedFollow(feed.id, user.id);
  console.log(`${user.name} is now following ${response.feeds.name}`);
}
