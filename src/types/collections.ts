import type { Models } from "appwrite";

export interface Tag extends Models.Document {
  name: string;
}

export interface Bookmark extends Models.Document {
  url: string;
  title: string;
  favicon_url: string;
  tag_id: Tag | null;
}
