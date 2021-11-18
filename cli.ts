import {
  existsSync,
  moveSync,
  walkSync,
} from "https://deno.land/std@0.115.1/fs/mod.ts";

import { decompress } from "https://deno.land/x/zip@v1.2.1/mod.ts";

// https://example.com/awesome/cli.ts
async function myAwesomeCli(): Promise<void> {
  if (existsSync("./bokehjs")) {
    Deno.removeSync("./bokehjs", { recursive: true });
  }

  if (!existsSync("./bokehjs-report.zip")) {
    console.log("bokehjs-report.zip not found!");
    return;
  }

  console.log(await decompress("./bokehjs-report.zip")); //=> ./

  for (const entry of walkSync("./bokehjs")) {
    if (entry.isFile) {
      moveSync(entry.path, `/Users/iury/git-repos/bokeh/bokeh/${entry.path}`, {
        overwrite: true,
      });
    }
  }
}

if (import.meta.main) {
  myAwesomeCli();
}
