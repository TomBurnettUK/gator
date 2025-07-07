import { eq } from "drizzle-orm";
import { db } from "src/db";
import { feeds, users } from "src/db/schema";

export async function createFeed(name: string, url: string, userId: string) {
  const [result] = await db
    .insert(feeds)
    .values({ name, url, userId })
    .returning();

  return result;
}

export async function getFeedsWithUsers() {
  const result = await db
    .select()
    .from(feeds)
    .leftJoin(users, eq(users.id, feeds.userId));
  return result;
}
