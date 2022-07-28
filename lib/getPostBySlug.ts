import fs from "fs";
import { join, basename, dirname } from "path";
import matter from "gray-matter";

export function getPostBySlug(
  slug: string,
  fields: string[] = [],
  folder: string
) {
  const allFiles = getSlugsAndPaths(folder);
  const file = allFiles.find((m) => slug === m.slug);
  if (!file) {
    throw new Error(`Cannot find file for slug '${slug}'`);
  } else {
    console.log(`Found ${file.path} for slug '${file.slug}'`);
  }

  return getPostByPath(file.path, fields, folder);
}

export function getPostByPath(
  path: string,
  fields: string[] = [],
  folder: string
) {
  const postsDirectory = join(process.cwd(), "data", folder);
  const realSlug = path.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = getSlugForFile(path);
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  if (!items["image"]) {
    const imagePath =
      join(process.cwd(), "public", "static", "images", realSlug) + ".png";
    console.log(`looking for ${imagePath}`);
    if (fs.existsSync(imagePath))
      items["image"] = join("static", "images", realSlug) + ".png";
  }

  return items;
}

export function getSlugsAndPaths(
  folder: string
): { slug: string; path: string }[] {
  const postsDirectory = join(process.cwd(), "data", folder);
  const posts: string[] = [];

  const folders: string[] = [postsDirectory];
  while (folders.length > 0) {
    const [path] = folders.splice(0, 1);

    fs.readdirSync(path).forEach((p) => {
      const childPath = join(path, p);

      if (fs.lstatSync(childPath).isDirectory()) {
        folders.push(childPath);
      } else {
        if (childPath.endsWith(".md")) {
          posts.push(childPath.replace(postsDirectory, ""));
        }
      }
    });
  }

  return posts.map((file) => {
    return {
      slug: getSlugForFile(file),
      path: file,
    };
  });
}

function getSlugForFile(path: string): string {
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

export function getAllPosts(fields: string[] = [], folder: string = "posts") {
  const slugs = getSlugsAndPaths(folder);
  console.log(slugs);

  const posts = slugs
    .filter((slug) => slug.path.endsWith("md"))
    .map((slug) => getPostByPath(slug.path, fields, folder))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  if (fields.findIndex((x) => x === "publishedAt")) {
    posts.forEach((post) => {
      if (!post.publishedAt) {
        console.log("missing publishedAt", post);
      }
    });
  }

  console.log(posts);

  return posts;
}
