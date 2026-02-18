import type { Collection } from "tinacms";
import post from "./collections/post.ts";
import author from "./collections/author.ts";
import tag from "./collections/tag.ts";
import legalDocument from "./collections/legal_document.ts";
import blog from "./collections/blog.ts";
import home from "./collections/home.ts";
import category from "./collections/category.ts";

export default [
  post,
  author,
  tag,
  legalDocument,
  blog,
  home,
  category,
] satisfies Collection[];
