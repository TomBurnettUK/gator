import { eq } from "drizzle-orm";
import { db } from "src/db";
import { feedFollows, feeds, Post, posts } from "src/db/schema";

export async function createPost(
  url: string,
  feedId: string,
  title?: string,
  description?: string,
  publishedAt?: Date
): Promise<Post> {
  const [result] = await db
    .insert(posts)
    .values({ url, feedId, title, description, publishedAt })
    .onConflictDoNothing()
    .returning();
  return result;
}

export async function getPostsForUser(
  userId: string,
  limit = 2
): Promise<Post[]> {
  const result = await db
    .select()
    .from(posts)
    .innerJoin(feeds, eq(posts.feedId, feeds.id))
    .innerJoin(feedFollows, eq(feeds.id, feedFollows.feedId))
    .where(eq(feedFollows.userId, userId))
    .orderBy(posts.publishedAt)
    .limit(limit);

  const userPosts = result.map((r) => r.posts);
  return userPosts;
}
