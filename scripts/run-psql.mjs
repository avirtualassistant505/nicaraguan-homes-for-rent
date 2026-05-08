import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
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
const envFile = resolve(".env.local");
const envFromFile = existsSync(envFile) ? loadDotEnv(envFile) : {};
const databaseUrl = envFromFile.DATABASE_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL is missing from .env.local and the process environment");
  process.exit(1);
}

const psqlCommand =
  process.env.PSQL_BIN ||
  (process.platform === "win32"
    ? "psql.exe"
    : existsSync("/opt/homebrew/opt/libpq/bin/psql")
      ? "/opt/homebrew/opt/libpq/bin/psql"
      : "psql");

const child = spawn(psqlCommand, [databaseUrl, ...args], {
  stdio: "inherit",
  shell: process.platform === "win32",
  env: {
    ...process.env,
    ...envFromFile,
  },
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});
