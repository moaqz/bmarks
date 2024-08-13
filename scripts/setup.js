import process from "node:process";
import {
  Client,
  Databases,
  ID,
  Permission,
  RelationMutate,
  RelationshipType,
  Role,
} from "node-appwrite";

const client = new Client()
  .setEndpoint(process.env.VITE_APPWRITE_API_ENDPOINT)
  .setProject(process.env.VITE_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const COLLECTION_PERMISSIONS = [
  Permission.create(Role.users()),
];

try {
  const databaseID = ID.unique();
  await databases.create(databaseID, ID.unique());

  const { $id: bookmarksCollectionID } = await databases.createCollection(
    databaseID,
    ID.unique(),
    "bookmarks",
    COLLECTION_PERMISSIONS,
    true,
  );

  await databases.createUrlAttribute(databaseID, bookmarksCollectionID, "url", true);
  await databases.createStringAttribute(databaseID, bookmarksCollectionID, "title", 255, true);
  await databases.createUrlAttribute(databaseID, bookmarksCollectionID, "favicon_url", false);

  const { $id: tagsCollectionID } = await databases.createCollection(
    databaseID,
    ID.unique(),
    "tags",
    COLLECTION_PERMISSIONS,
    true,
  );

  await databases.createStringAttribute(databaseID, tagsCollectionID, "name", 40, true);

  await databases.createRelationshipAttribute(
    databaseID,
    bookmarksCollectionID,
    tagsCollectionID,
    RelationshipType.ManyToOne,
    false,
    "tag_id",
    undefined,
    RelationMutate.SetNull,
  );

  const envVars = `
  VITE_APPWRITE_DATABASE_ID=${databaseID}
  VITE_APPWRITE_BOOKMARKS_COLLECTION_ID=${bookmarksCollectionID}
  VITE_APPWRITE_TAGS_COLLECTION_ID=${tagsCollectionID}
  `;

  console.log("Update the following variables in your `.env` file:\n", envVars);
}
catch (e) {
  console.error(e.message);
  process.exit(1);
}
