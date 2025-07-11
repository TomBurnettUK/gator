import { eq, sql } from "drizzle-orm";
import { db } from "src/db";
import { Feed, feeds, users } from "src/db/schema";

export async function createFeed(name: string, url: string, userId: string) {
  const [result] = await db
    .insert(feeds)
    .values({ name, url, userId })
    .returning();

  return result;
}

export async function getFeedByUrl(url: string) {
  const [result] = await db.select().from(feeds).where(eq(feeds.url, url));
  return result;
}

export async function getFeedsWithUsers() {
  const result = await db
    .select()
    .from(feeds)
    .leftJoin(users, eq(users.id, feeds.userId));
  return result;
}

export async function markFeedFetched(feedId: string) {
  const timestamp = new Date();
  await db
    .update(feeds)
    .set({ updatedAt: timestamp, lastFetchedAt: timestamp })
    .where(eq(feeds.id, feedId));
}

export async function getNextFeedToFetch(): Promise<Feed> {
  const [result] = await db.execute(
    sql`SELECT * FROM ${feeds} ORDER BY ${feeds.lastFetchedAt}ASC NULLS FIRST LIMIT 1`
  );
  return result as Feed;
}
