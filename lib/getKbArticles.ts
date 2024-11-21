import { lstat, readFile, readdir } from "fs/promises";
import matter from "gray-matter";
import { join } from "path";

export async function getAllKbFiles() {
  return [
    ...(await getAllKbFilesFromFolder("kb")),
    ...(await getAllKbFilesFromFolder("notes")),
  ];
}

async function getAllKbFilesFromFolder(folder: string) {
  const kbFolder = join(process.cwd(), "pages", folder);
  const folders = [kbFolder];
  const files: {
    folder: string;
    relativePath: string;
    fullPath: string;
    modifiedOn: Date;
    data: {
      [key: string]: any;
    };
  }[] = [];

  while (folders.length > 0) {
    const [path] = folders.splice(0, 1);
    console.log("Checking", path);

    const paths = await readdir(path);
    for (const p of paths) {
      const childPath = join(path, p);
      console.log("Found", p);

      const info = await lstat(childPath);

      if (info.isDirectory()) {
        folders.push(childPath);
      } else {
        if (childPath.endsWith(".md")) {
          const fileContents = await readFile(childPath, "utf8");
          const { data } = matter(fileContents);

          files.push({
            folder: folder,
            relativePath: childPath.replace(kbFolder, ""),
            fullPath: childPath,
            modifiedOn: info.mtime,
            data,
          });
        }
      }
    }
  }

  return files;
}

export async function getKbFile(relativePath: string) {
  const kbFolder = join(process.cwd(), "pages", "kb");
  const fullPath = join(kbFolder, relativePath);
  const fileContents = await readFile(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return {
    data,
    content,
  };
}
