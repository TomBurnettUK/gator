import { getFeedFollowsForUser } from "src/db/queries/feedFollows";
import {} from "src/db/queries/feeds";
import { User } from "src/db/schema";

export async function handlerFollowing(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  const response = await getFeedFollowsForUser(user.id);

  console.log(`${user.name} is following:`);
  for (const data of response) {
    console.log(data.feeds.name);
  }
}
