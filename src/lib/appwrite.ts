import { Account, Client, ID } from "appwrite";

const config = {
  endpoint: import.meta.env.VITE_APPWRITE_API_ENDPOINT as string,
  project: import.meta.env.VITE_APPWRITE_PROJECT_ID as string,
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
  id: ID,
};
