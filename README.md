# Gator

Gator is a simple command-line RSS feed aggregator and browser built with TypeScript and PostgreSQL, as a tutorial project for Boot.dev. It allows users to add RSS feeds, follow/unfollow feeds, and browse aggregated posts.

## Features

- Register and manage users
- Add and follow RSS feeds
- Aggregate and browse posts from followed feeds
- List all users and feeds

## Commands

- `register <username>`: Register a new user
- `login <username>`: Log in as an existing user
- `addfeed <name> <url>`: Add a new RSS feed
- `follow <feed-url>`: Follow an existing feed
- `unfollow <feed-url>`: Unfollow a feed
- `feeds`: List all feeds
- `following`: List feeds you are following
- `browse`: Browse posts from followed feeds
- `users`: List all users
- `reset`: Reset all users
- `agg <interval>`: Aggregate feeds at a given interval (in the format `1m`, `10s` etc)

## Usage

```sh
npm install
node run start <command> [args...]
```

Example:

```sh
node run start register alice
node run start login alice
node run start addfeed "My Blog" https://blog.example.com/rss
node run start follow https://blog.example.com/rss
node run start agg
node run start browse
```

## Configuration

Gator stores configuration in `~/.gatorconfig.json`. Ensure you set your PostgreSQL database URL in this file in the following format:

```json
{
  "dbUrl": "postgres://user:password@localhost:5432/gatordb"
}
```

## Requirements

- Node.js
- PostgreSQL
