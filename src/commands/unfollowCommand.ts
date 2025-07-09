import { deleteFeedFollow } from "src/db/queries/feedFollows";
import { User } from "src/db/schema";

export async function handlerUnfollow(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  const url = args[0];

  if (!url) {
    throw new Error("unfollow command requires url as argument");
  }

  await deleteFeedFollow(user.id, url);
  console.log(`${user.name} unfollowed "${url}" feed`);
}
