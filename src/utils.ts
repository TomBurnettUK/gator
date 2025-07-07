import { Feed, User } from "src/db/schema";

export function printFeed(feed: Feed, user: User) {
  Object.entries(feed).forEach(([key, value]) => {
    console.log(`${key}:`, value);
  });

  Object.entries(user).forEach(([key, value]) => {
    console.log(`${key}:`, value);
  });
}
