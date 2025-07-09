import { and, eq } from "drizzle-orm";
import { db } from "src/db";
import { feedFollows, feeds, users } from "src/db/schema";

export async function createFeedFollow(feedId: string, userId: string) {
  const [insertResult] = await db
    .insert(feedFollows)
    .values({ feedId, userId })
    .returning();

  const [selectResult] = await db
    .select()
    .from(feedFollows)
    .where(eq(feedFollows.id, insertResult.id))
    .innerJoin(users, eq(users.id, feedFollows.userId))
    .innerJoin(feeds, eq(feeds.id, feedFollows.feedId));

  return selectResult;
}

export async function getFeedFollowsForUser(userId: string) {
  const result = await db
    .select()
    .from(feedFollows)
    .where(eq(feedFollows.userId, userId))
    .innerJoin(users, eq(users.id, feedFollows.userId))
    .innerJoin(feeds, eq(feeds.id, feedFollows.feedId));

  return result;
}

export async function deleteFeedFollow(userId: string, url: string) {
  const [feed] = await db.select().from(feeds).where(eq(feeds.url, url));

  if (!feed) {
    throw new Error(`Feed with url "${url}" not found`);
  }

  await db
    .delete(feedFollows)
    .where(
      and(eq(feedFollows.userId, userId), eq(feedFollows.feedId, feed.id))
    );
}
