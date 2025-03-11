import fs from "fs";
import matter from "gray-matter";
import { basename, dirname, join } from "path";

function last(arr: string[]) {
  return arr[arr.length - 1];
}

export function getPostByRelativePath(
  relativePath: string,
  fields: string[] = []
) {
  const fullPath = join(process.cwd(), "pages", relativePath);
  const path = last(relativePath.split("/"));

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const realSlug = path.replace(/\.md$/, "");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = getSlugForPath(path);
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }

    if (field === "publishedAt") {
      if ((items[field] as any) instanceof Date) {
        items[field] = (items[field] as any).toISOString().split("T")[0];
      }
    }
  });

  if (!items["image"]) {
    const imagePath =
      join(process.cwd(), "public", "static", "images", realSlug) + ".png";
    // console.log(`looking for ${imagePath}`);
    if (fs.existsSync(imagePath))
      items["image"] = "/" + join("static", "images", realSlug) + ".png";
  }

  return items;
}

function getSlugForPath(path: string): string {
  const realSlug = path.replace(/\.md$/, "");
  const name = basename(path);

  if (name === "index.md") {
    const dir = dirname(path);
    if (dir.indexOf("/") === -1) {
      return dir;
    } else {
      return dir.substring(dir.lastIndexOf("/") + 1);
    }
  }

  return name.replace(".md", "");
}

export function getPostByRealPath(fullPath: string, fields: string[]) {
  const realSlug = basename(fullPath).replace(/\.md$/, "");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    } else {
      // Special fields that always exist
      if (field === "slug") {
        items[field] = getSlugForPath(fullPath);
      }
    }
  });

  if (!items["image"]) {
    const imagePath =
      join(process.cwd(), "public", "static", "images", realSlug) + ".png";
    // console.log(`looking for ${imagePath}`);
    if (fs.existsSync(imagePath))
      items["image"] = "/" + join("static", "images", realSlug) + ".png";
  }

  return items;
}
