import { cp, lstat, readdir } from "fs/promises";
import { join, basename, extname } from "path";

/**
 * Defines the path to the data directory, relative to the current working directory.
 */
const dataDir = join(process.cwd(), "data");

async function copyFiles(sourceDir) {
  try {
    const files = await readdir(sourceDir);

    for (const file of files) {
      const sourceFilePath = join(sourceDir, file);

      if ((await lstat(sourceFilePath)).isDirectory()) {
        await copyFiles(sourceFilePath);
      } else {
        const filename = basename(sourceFilePath);
        const ext = extname(sourceFilePath);

        if (filename === ".DS_Store" || ext === ".md" || ext === ".mdx") {
          continue;
        }

        const destination = join(process.cwd(), "public", "blog", filename);
        await cp(sourceFilePath, destination);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

await copyFiles(dataDir);
