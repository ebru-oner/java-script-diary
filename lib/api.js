import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "posts");
const codesDirectory = join(process.cwd(), "codes");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getCodeSlugs() {
  return fs.readdirSync(codesDirectory);
}

export function getPostsBySlug(slug, fields) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContents);

  const items = {};
  fields.map((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }

    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getCodeBySlug(slug, fields) {
  const realSlug = slug.replace(/\.js$/, "");
  const fullPath = join(codesDirectory, `${realSlug}.js`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContents);
  console.log(fileContents);
  const items = {};
  fields.map((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }

    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields) {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPostsBySlug(slug, fields)).sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getAllCodes(fields) {
  const slugs = getCodeSlugs();
  const codes = slugs.map((slug) => getCodeBySlug(slug, fields));
  return codes;
}
