import { formatDate } from "date-fns";
import { lstat, readFile, readdir } from "fs/promises";
import matter from "gray-matter";
import { join } from "path";

export async function getAllKbFiles() {
  return [
    ...(await getAllMarkdownFilesFromFolder("kb")),
    ...(await getAllMarkdownFilesFromFolder("notes")),
  ];
}

export async function getAllMarkdownFilesFromFolder(
  folder: string,
  fields: string[] = []
) {
  const folderPath = join(process.cwd(), "pages", folder);
  const folders = [folderPath];
  const files: {
    title: string;
    slug: string;
    publishedAt: string;
    summary: string;
    folder: string;
    relativePath: string;
    relativeUrl: string;
    fullPath: string;
    modifiedOn: Date;
    data: {
      [key: string]: any;
    };
    content: string;
  }[] = [];

  while (folders.length > 0) {
    const [path] = folders.splice(0, 1);
    console.log("Checking", path);

    const paths = await readdir(path);
    for (const p of paths) {
      const childPath = join(path, p);

      const info = await lstat(childPath);

      if (info.isDirectory()) {
        folders.push(childPath);
      } else if (childPath.endsWith(".md")) {
        console.debug("Found markdown file", p);

        const fileContents = await readFile(childPath, "utf8");
        const { data, content } = matter(fileContents);

        if (!data.publishedAt) {
          console.error("No publishedAt found for", childPath);
        }

        data.publishedAt = fixDate(data.publishedAt);

        const relativePath = childPath.replace(folderPath, "");
        const slug = relativePath.replace("/", "").replace(".md", "");

        files.push({
          title: data.title ?? slug,
          slug,
          publishedAt: data.publishedAt,
          summary: data.summary ?? "",
          folder,
          relativePath: `${relativePath}`,
          relativeUrl: `${folder}/${slug}`,
          fullPath: childPath,
          modifiedOn: info.mtime,
          data,
          content: fields.includes("content") ? content : "",
        });
      } else {
        console.debug("Skipping file", p);
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

function fixDate(date: Date | undefined | string): string | null {
  if (!date) {
    return null;
  }

  if (typeof date === "string") {
    return date;
  }

  return formatDate(date, "yyyy-MM-dd");
}
