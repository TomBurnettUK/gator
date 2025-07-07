import { readConfig } from "src/config";
import { createFeed } from "src/db/queries/feeds";
import { getUser } from "src/db/queries/users";
import { printFeed } from "src/utils";

export async function handlerAddFeed(cmdName: string, ...args: string[]) {
  const [name, url] = [...args];

  if (!name || !url) {
    throw new Error(
      "The addfeed command requires two args, name and url (e.g title www.blog.com)"
    );
  }

  const { currentUserName } = readConfig();
  const currentUser = await getUser(currentUserName);

  const createdFeed = await createFeed(name, url, currentUser.id);
  printFeed(createdFeed, currentUser);
}
