import { readFileSync, writeFileSync } from "fs";
import { homedir } from "os";
import path from "path";

const configFileName = ".gatorconfig.json";

export type Config = {
  dbUrl: string;
  currentUserName: string;
};

export function setUser(userName: string) {
  const config = readConfig();
  config.currentUserName = userName;
  writeConfig(config);
}

export function readConfig(): Config {
  const configString = readFileSync(getConfigFilePath(), { encoding: "utf-8" });
  const configObject = JSON.parse(configString);
  return validateConfig(configObject);
}

function getConfigFilePath(): string {
  return path.join(homedir(), configFileName);
}

function writeConfig(config: Config) {
  writeFileSync(getConfigFilePath(), JSON.stringify(config, null, 2) + "\n");
}

function validateConfig(rawConfig: any): Config {
  if (typeof rawConfig !== "object" || rawConfig === null) {
    throw new Error("Config must be a non-null object");
  }

  if (!("dbUrl" in rawConfig)) {
    throw new Error("Config missing required key: dbUrl");
  }
  if (typeof rawConfig.dbUrl !== "string") {
    throw new Error("Config key 'dbUrl' must be a string");
  }

  if (!("currentUserName" in rawConfig)) {
    throw new Error("Config missing required key: currentUserName");
  }
  if (typeof rawConfig.currentUserName !== "string") {
    throw new Error("Config key 'currentUserName' must be a string");
  }

  return rawConfig as Config;
}
