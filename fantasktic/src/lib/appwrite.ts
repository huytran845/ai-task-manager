// Node Modules
import { Client, Databases, ID, Query } from "appwrite";

const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

// Utilize appwrite API to establish connection with appwrite's database for application data storage.
const client = new Client();
client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(APPWRITE_PROJECT_ID);

const databases = new Databases(client);

export { databases, ID, Query };
