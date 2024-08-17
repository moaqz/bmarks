import type { Models } from "appwrite";

export type UserModel = Models.User<Models.Preferences>;

export interface CollectionDefaults {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
};
