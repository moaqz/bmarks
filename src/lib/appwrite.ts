import { Account, Client, Databases, ID } from "appwrite";

export const config = {
  endpoint: import.meta.env.VITE_APPWRITE_API_ENDPOINT as string,
  project: import.meta.env.VITE_APPWRITE_PROJECT_ID as string,
  databaseID: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  bookmarksCollectionID: import.meta.env.VITE_APPWRITE_BOOKMARKS_COLLECTION_ID,
  tagsCollectionID: import.meta.env.VITE_APPWRITE_TAGS_COLLECTION_ID,
};

if (
  !config.endpoint || !config.project || !config.databaseID
  || !config.bookmarksCollectionID || !config.tagsCollectionID
) {
  throw new Error("Missing one or more environment variables.");
}

const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.project);

const account = new Account(client);
const databases = new Databases(client);

const COLLECTIONS = {
  bookmarks: config.bookmarksCollectionID,
  tags: config.tagsCollectionID,
};

type Collection = keyof typeof COLLECTIONS;

function createDocument(
  collection: Collection,
  payload: Record<string, unknown>,
  permissions?: string[],
) {
  return databases.createDocument(
    config.databaseID,
    COLLECTIONS[collection],
    ID.unique(),
    payload,
    permissions,
  );
}

function deleteDocument(
  collection: Collection,
  documentId: string,
) {
  return databases.deleteDocument(
    config.databaseID,
    COLLECTIONS[collection],
    documentId,
  );
}

function updateDocument(
  collection: Collection,
  documentId: string,
  payload: Record<string, unknown>,
  permissions?: string[],
) {
  return databases.updateDocument(
    config.databaseID,
    COLLECTIONS[collection],
    documentId,
    payload,
    permissions,
  );
}

function listDocuments(
  collection: Collection,
  queries?: string[],
) {
  return databases.listDocuments(
    config.databaseID,
    COLLECTIONS[collection],
    queries,
  );
}

export { account, databases, createDocument, deleteDocument, updateDocument, listDocuments };
