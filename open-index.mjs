import { access } from "node:fs/promises";
import { constants } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { join } from "node:path";
import { cwd, platform } from "node:process";
import { pathToFileURL } from "node:url";

const execFileAsync = promisify(execFile);
const indexPath = join(cwd(), "index.html");
const indexUrl = pathToFileURL(indexPath).href;

await access(indexPath, constants.R_OK);

console.log(`Landing page file: ${indexUrl}`);

const openers = {
  darwin: ["open", [indexPath]],
  linux: ["xdg-open", [indexPath]],
  win32: ["cmd", ["/c", "start", "", indexPath]],
};

const opener = openers[platform];

if (opener) {
  try {
    await execFileAsync(opener[0], opener[1]);
    console.log("Opened the landing page in your default browser.");
  } catch {
    console.log("Automatic browser launch is unavailable in this environment.");
  }
} else {
  console.log("Open the file URL above in your browser.");
}
