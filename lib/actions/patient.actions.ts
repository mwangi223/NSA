"use server";

import { ID, Query } from "node-appwrite";
import {
  CreateUserParams,
  RegisterUserParams,
} from "../../types/appwrite.types";
import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";

// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    return parseStringify(newUser);
  } catch (error: any) {
    // Check for existing user
    if (error?.code === 409) {
      console.warn(`User with email ${user.email} already exists.`);
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      if (existingUser.users.length > 0) {
        console.info("Returning existing user:", existingUser.users[0]);
        return parseStringify(existingUser.users[0]);
      }
    }

    console.error("Failed to create a new user:", error.message || error);
    throw new Error("Unable to create user. Please try again later.");
  }
};

// GET USER
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};

// REGISTER PATIENT
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let fileId: string | null = null;
    let fileUrl: string | null = null;

    if (identificationDocument) {
      // Validate file type and size (e.g., max 5MB)
      if (identificationDocument.size > 5 * 1024 * 1024) {
        console.error("File size exceeds the maximum limit of 5MB.");
        throw new Error("File size exceeds the maximum limit of 5MB.");
      }

      // Upload file
      try {
        const uploadedFile = await storage.createFile(
          BUCKET_ID!,
          ID.unique(),
          identificationDocument
        );

        fileId = uploadedFile.$id;
        fileUrl = `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${PROJECT_ID}`;
        console.info("File uploaded successfully:", fileUrl);
      } catch (fileError) {
        if (fileError instanceof Error) {
          console.error("Failed to upload the file:", fileError.message);
        } else {
          console.error("Failed to upload the file:", fileError);
        }
        throw new Error("File upload failed. Please try again.");
      }
    }

    // Create new patient document
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: fileId,
        identificationDocumentUrl: fileUrl,
        ...patient,
      }
    );

    console.info("New patient registered:", newPatient);
    return parseStringify(newPatient);
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "An error occurred while registering the patient:",
        error.message
      );
    } else {
      console.error("An error occurred while registering the patient:", error);
    }
    throw new Error("Unable to register patient. Please try again later.");
  }
};

// GET PATIENT
export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
};
