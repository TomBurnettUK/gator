import {
  CommandsRegistry,
  middlewareLoggedIn,
  registerCommand,
  runCommand,
} from "src/commands";
import { handlerAddFeed } from "src/commands/addFeedCommand";
import { handlerAgg } from "src/commands/aggCommand";
import { handlerFeeds } from "src/commands/feedsCommand";
import { handlerFollow } from "src/commands/followCommand";
import { handlerFollowing } from "src/commands/followingCommand";
import { handlerLogin } from "src/commands/loginCommand";
import { handlerRegister } from "src/commands/registerCommand";
import { handlerReset } from "src/commands/resetCommand";
import { handlerUsers } from "src/commands/usersCommand";

async function main() {
  const registry: CommandsRegistry = {};

  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handlerRegister);
  registerCommand(registry, "reset", handlerReset);
  registerCommand(registry, "users", handlerUsers);
  registerCommand(registry, "agg", handlerAgg);
  registerCommand(registry, "addfeed", middlewareLoggedIn(handlerAddFeed));
  registerCommand(registry, "feeds", handlerFeeds);
  registerCommand(registry, "follow", middlewareLoggedIn(handlerFollow));
  registerCommand(registry, "following", middlewareLoggedIn(handlerFollowing));

  const [command, ...args] = process.argv.slice(2);

  if (!command) {
    console.log("Program requires at least one argument");
    process.exit(1);
  }

  try {
    await runCommand(registry, command, ...args);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      process.exit(1);
    }
  }
  process.exit(0);
}

main();
