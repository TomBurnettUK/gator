import { readConfig, setUser } from "src/config";

function main() {
  setUser("Fred");
  console.log(readConfig());
}

main();
