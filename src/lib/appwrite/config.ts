import { Client, Databases, Avatars, Account, Storage } from "appwrite";

// Appwrite Config
export const appwriteConfig = {
    url: import.meta.env.VITE_APPWRITE_URL,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    usersCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
    postsCollectionId: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
    savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID
}

// Client setup
export const client = new Client();
client.setProject(appwriteConfig.projectId); // set project
client.setEndpoint(appwriteConfig.url) // set endpoint

export const account = new Account(client); 
export const storage = new Storage(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);