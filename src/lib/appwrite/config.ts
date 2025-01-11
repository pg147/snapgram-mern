import { Client, Databases, Avatars, Account, Storage } from "appwrite";

// Appwrite Config
export const appwriteConfig = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    url: import.meta.env.VITE_APPWRITE_URL
}

// Client setup
export const client = new Client();
client.setProject(appwriteConfig.projectId); // set project
client.setEndpoint(appwriteConfig.url) // set endpoint

export const account = new Account(client); 
export const storage = new Storage(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);