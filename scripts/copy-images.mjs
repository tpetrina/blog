import fs, { cpSync } from "fs";
import { join, basename, extname } from "path";

const dataDir = join(process.cwd(), "data");

function moveFiles(path) {
  const result = fs.readdirSync(path);
  result.forEach((child) => {
    const childPath = join(path, child);
    if (fs.lstatSync(childPath).isDirectory()) {
      moveFiles(childPath);
    } else {
      const filename = basename(childPath);
      const ext = extname(childPath);

      if (filename === ".DS_Store" || ext === ".md" || ext === ".mdx") {
        return;
      }

      cpSync(childPath, join(process.cwd(), "public", "blog", `${filename}`));
    }
  });
}

moveFiles(dataDir);
