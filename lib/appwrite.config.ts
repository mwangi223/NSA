import * as sdk from "node-appwrite";
import dotenv from "dotenv";

dotenv.config();

export const {
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  BUCKET_ID,
  ENDPOINT,
  ADMIN_PASSKEY,
} = process.env;

// Ensure required variables are set
if (!ENDPOINT || !PROJECT_ID || !API_KEY) {
  throw new Error("Missing required Appwrite environment variables.");
}

const client = new sdk.Client();
client.setEndpoint(ENDPOINT).setProject(PROJECT_ID).setKey(API_KEY);

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);
