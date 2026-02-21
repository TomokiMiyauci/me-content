import type { Collection, Schema } from "tinacms";
import post from "./collections/post.ts";
import author from "./collections/author.ts";
import tag from "./collections/tag.ts";
import legalDocument from "./collections/legal_document.ts";
import blog from "./collections/blog.ts";
import home from "./collections/home.ts";
import category from "./collections/category.ts";
import translationMetadata from "./collections/translation_metadata.ts";

const collections = [
  post,
  author,
  tag,
  legalDocument,
  blog,
  home,
  category,
  translationMetadata,
] satisfies Collection[];

export default {
  collections,
} satisfies Schema;
