import { XMLParser } from "fast-xml-parser";

export type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

export type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export async function fetchFeed(feedURL: string): Promise<RSSFeed> {
  const response = await fetch(feedURL, { headers: { "User-Agent": "gator" } });
  const textData = await response.text();

  const parser = new XMLParser();
  const xmlObject = await parser.parse(textData);
  const rssFeed = validateRSSFeed(xmlObject["rss"]);
  return rssFeed;
}

function validateRSSFeed(object: any): RSSFeed {
  if (!("channel" in object)) {
    throw new Error("Invalid RSS response (missing 'channel')");
  }

  if (
    typeof object.channel["title"] !== "string" ||
    typeof object.channel["link"] !== "string" ||
    typeof object.channel["description"] !== "string"
  ) {
    throw new Error("Invalid RSS response ('channel' missing metadata)");
  }

  if (!object.channel["item"] || !Array.isArray(object.channel.item)) {
    throw new Error("Invalid 'item' field on 'channel'");
  }

  const rssItems: RSSItem[] = [];

  for (const item of object.channel.item) {
    if (
      typeof item["title"] === "string" ||
      typeof item["link"] === "string" ||
      typeof item["description"] === "string" ||
      typeof item["pubDate"] === "string"
    ) {
      rssItems.push({
        title: item.title,
        link: item.link,
        description: item.description,
        pubDate: item.pubDate,
      });
    }
  }

  const rssFeed: RSSFeed = {
    channel: {
      title: object.channel.title,
      link: object.channel.link,
      description: object.channel.description,
      item: rssItems,
    },
  };

  return rssFeed;
}
