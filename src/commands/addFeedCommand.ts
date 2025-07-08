import { createFeed, createFeedFollow } from "src/db/queries/feeds";
import { User } from "src/db/schema";
import { printFeed } from "src/utils";

export async function handlerAddFeed(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  const [name, url] = [...args];

  if (!name || !url) {
    throw new Error(
      "The addfeed command requires two args, name and url (e.g title www.blog.com)"
    );
  }

  const createdFeed = await createFeed(name, url, user.id);
  await createFeedFollow(createdFeed.id, user.id);

  printFeed(createdFeed, user);
}
