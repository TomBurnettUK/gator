import { getFeedsWithUsers } from "src/db/queries/feeds";

export async function handlerFeeds(cmdName: string, ...args: string[]) {
  const response = await getFeedsWithUsers();
  for (const { feeds, users } of response) {
    console.log("Feed name: ", feeds.name);
    console.log("Feed URL: ", feeds.url);
    console.log("Added by: ", users?.name);
  }
}
