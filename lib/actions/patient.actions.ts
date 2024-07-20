"use server"

import { ID, Query } from 'node-appwrite'
import { 
    DATABASE_ID, 
    databases, 
    ENDPOINT, 
    PATIENT_COLLECTION_ID, 
    PROJECT_ID, BUCKET_ID, 
    storage, 
    users } from '../appwrite.config'
import { parseStringify } from '../utils'
import { InputFile } from "node-appwrite/file"

// create appwrite user

export const createUser = async (user:CreateUserParams) => {

    try {
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name 
        )

        console.log(newUser)

        return parseStringify(newUser)

    } catch (error: any) {
        if(error && error?.code === 409){
            const existingUser = await users.list([
                Query.equal('email',[user.email])
            ])
            
            return existingUser.users[0]
        }
        
        console.error("An error occurred whilst trying to create a new user", error)

    }

}

//get patient 
export const getUser = async(userId:string) => {

    // console.log("getUser function called with userId:", userId);

    try{
        const user = await users.get(userId)
        return parseStringify(user)
    } catch (error: any) {
        console.error("An error occurred whilst trying to fetch user", error)
    }

}

export const getPatient = async(userID:string) => {

    console.log("getPatient function called with userId:", userID);

    try{
        const patients = await databases.listDocuments(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            [Query.equal("userID", [userID])] //Appwrite Exception: Attribute not found in schema
        )

        return parseStringify(patients.documents[0])

    } catch (error: any) {
        console.error("Ahh shit, An error occurred whilst trying to fetch the patient ", error)
    }

}

//register patient details 

export const registerPatient = async({identificationDocument, ...patient}: RegisterUserParams) => {


    try {
        let file 
        
        //uploads the identification document to the storage bucket
        if(identificationDocument){
            const inputFile =
                identificationDocument &&
                InputFile.fromBuffer(
                    identificationDocument?.get("blobFile") as Blob,
                    identificationDocument?.get("fileName") as string
                );

            file = await storage.createFile(
                BUCKET_ID!,
                ID.unique(),
                inputFile)

        }
        
        // creates a new entry in the patients collection with the patient details
        const newPatient = await databases.createDocument(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            ID.unique(),
            {
                identificationDocument: file?.$id ? file?.$id : null,
                identificationDocumentURL: file?.$id ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`: null,
                ...patient
            },

        )
        
        return parseStringify(newPatient)
        
    } catch (error) {
        console.error("An error occurred whilst trying to register a new patient", error)   
        throw error
    }

}