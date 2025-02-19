// Appwrite Imports
import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases } from "./config";

// Types
import { INewUser } from "@/types";

export async function createUserAccount(user: INewUser) {
  try {
    // Check if user already exists
    const existingUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("email", user.email)]
    );

    if (existingUser.documents.length > 0) {
      console.log("User already exists");
      return null;
    }

    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw new Error();

    const avatarURL = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      username: user.username,
      email: user.email,
      imageUrl: avatarURL,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: string | URL;
  username?: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function checkAndDeleteExistingSession() {
  try {
    const sessions = await account.listSessions();
    if (sessions.total > 0) {
      await account.deleteSession("current");
    }
  } catch (error) {
    console.error("Error in checkAndDeleteExistingSession:", error);
    throw error;
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    await checkAndDeleteExistingSession();

    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );

    if (!session) {
      return console.log("Error creating session.");
    }

    return session;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw new Error();

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw new Error();

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}
