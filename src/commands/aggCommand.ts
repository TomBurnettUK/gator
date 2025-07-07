import { fetchFeed } from "src/xml";
import { inspect } from "util";

export async function handlerAgg(cmdName: string, ...args: string[]) {
  const feed = await fetchFeed("https://www.wagslane.dev/index.xml");
  console.log(inspect(feed, true, null));
}
