import { getNextFeedToFetch, markFeedFetched } from "src/db/queries/feeds";
import { createPost } from "src/db/queries/posts";
import { fetchFeed } from "src/xml";

type TimeFormat = {
  duration: number;
  unit: "ms" | "s" | "m" | "h";
};

export async function handlerAgg(cmdName: string, ...args: string[]) {
  const [durationStr] = args;

  if (!durationStr) {
    throw new Error(
      "agg command requires refresh interval argument (1s / 2m / 4h etc...)"
    );
  }

  const time = parseDuration(durationStr);
  const timeInMs = timeToMs(time);

  console.log(`Collecting feeds every ${durationStr} (${timeInMs}ms)`);

  scrapeFeeds().catch(handleError);

  const interval = setInterval(() => {
    scrapeFeeds().catch(handleError);
  }, timeInMs);

  await new Promise<void>((resolve) => {
    process.on("SIGINT", () => {
      console.log("Shutting down feed aggregator...");
      clearInterval(interval);
      resolve();
    });
  });
}

async function scrapeFeeds() {
  const nextFeed = await getNextFeedToFetch();
  console.log(`fetching ${nextFeed.name}...`);
  await markFeedFetched(nextFeed.id);
  const feedResult = await fetchFeed(nextFeed.url);

  for (const post of feedResult.channel.item) {
    // console.log("writing.... ", post.title);
    await createPost(
      post.link,
      nextFeed.id,
      post.title,
      post.description,
      new Date(post.pubDate)
    );
  }
}

function parseDuration(durationStr: string): TimeFormat {
  const regex = /^(\d+)(ms|s|m|h)$/;
  const match = durationStr.match(regex);

  if (!match) {
    throw new Error(
      "Invalid interval format. Use formats like 1s, 2m, 4h, etc..."
    );
  }

  const [, time, unit] = match;
  return { duration: Number(time), unit: unit as TimeFormat["unit"] };
}

function timeToMs(time: TimeFormat): number {
  const multipliers: Record<TimeFormat["unit"], number> = {
    ms: 1,
    s: 1000,
    m: 60000,
    h: 3_600_000,
  };
  return time.duration * multipliers[time.unit];
}

function handleError(reason: any) {
  throw new Error(reason);
}
