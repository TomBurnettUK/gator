import { getPostsForUser } from "src/db/queries/posts";
import { User } from "src/db/schema";

export async function handlerBrowse(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  const posts = await getPostsForUser(user.id);
  for (const post of posts) {
    console.log(`Published ${post.publishedAt?.toLocaleDateString()}`);
    console.log(post.title, "\n");
    console.log(post.description, "\n");
    console.log(post.url, "\n\n");
  }
}
