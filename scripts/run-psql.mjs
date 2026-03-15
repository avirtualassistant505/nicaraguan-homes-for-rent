import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadDotEnv(filePath) {
  const env = {};
  const raw = readFileSync(filePath, "utf8");

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    env[key] = value;
  }

  return env;
}

const args = process.argv.slice(2);
const envFromFile = loadDotEnv(resolve(".env.local"));

if (!envFromFile.DATABASE_URL) {
  console.error("DATABASE_URL is missing from .env.local");
  process.exit(1);
}

const child = spawn(
  "/opt/homebrew/opt/libpq/bin/psql",
  [envFromFile.DATABASE_URL, ...args],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      ...envFromFile,
    },
  },
);

child.on("exit", (code) => {
  process.exit(code ?? 1);
});
