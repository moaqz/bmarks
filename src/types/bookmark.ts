import type { CollectionDefaults } from "./appwrite";
import type { Tag } from "./tag";

export interface Bookmark extends CollectionDefaults {
  url: string;
  title: string;
  favicon_url: string;
  tag_id: Tag | null;
}
