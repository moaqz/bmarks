import type { CollectionDefaults } from "./appwrite";

export interface Bookmark extends CollectionDefaults {
  url: string;
  title: string;
  favicon_url: string;
}
