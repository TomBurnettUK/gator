import { exit } from "process";
import { CommandsRegistry, registerCommand, runCommand } from "src/commands";
import { handlerLogin } from "src/commands/loginCommand";

function main() {
  const registry: CommandsRegistry = {};
  registerCommand(registry, "login", handlerLogin);

  const [command, ...args] = process.argv.slice(2);

  if (!command) {
    console.log("Program requires at least one argument");
    exit(1);
  }

  try {
    runCommand(registry, command, ...args);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      exit(1);
    }
  }
}

main();
