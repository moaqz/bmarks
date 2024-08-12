import { Account, Client, Databases, ID } from "appwrite";

export const config = {
  endpoint: import.meta.env.VITE_APPWRITE_API_ENDPOINT as string,
  project: import.meta.env.VITE_APPWRITE_PROJECT_ID as string,
  databaseID: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  bookmarksCollectionID: import.meta.env.VITE_APPWRITE_BOOKMARKS_COLLECTION_ID,
  tagsCollectionID: import.meta.env.VITE_APPWRITE_TAGS_COLLECTION_ID,
};

if (!config.endpoint || !config.project) {
  throw new Error(
    "Missing environment variables: VITE_APPWRITE_API_ENDPOINT and/or VITE_APPWRITE_PROJECT_ID.",
  );
}

const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.project);

export const SERVICES = {
  account: new Account(client),
  databases: new Databases(client),
  id: ID,
};
