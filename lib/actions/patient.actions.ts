"use server"

import { ID, Query } from 'node-appwrite'
import { DATABASE_ID, databases, ENDPOINT, PATIENT_COLLECTION_ID, PROJECT_ID, BUCKET_ID, storage, users } from '../appwrite.config'
import { parseStringify } from '../utils'
import { InputFile } from 'node-appwrite/file'

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
    try{
        const user = await users.get(userId)
        return parseStringify(user)
    } catch (error: any) {
        console.error("An error occurred whilst trying to fetch user", error)
    }

}

//register patient details 

export const registerPatient = async({identificationDocument, ...patient}: RegisterUserParams) => {
    try {
        let file 

        if(identificationDocument){
            const inputFile = InputFile.fromBuffer(
                identificationDocument?.get('blobFile') as Blob,
                identificationDocument?.get('fileName') as string
            )

            file = await storage.createFile(
                BUCKET_ID!,
                ID.unique(),
                inputFile)

        }

        const newPatient = await databases.createDocument(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            ID.unique(),
            {
                identificationDocument: file?.$id ? file?.$id : null,
                identificationDocumentURL: file?.$id ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`: null
            },
        )
        
    } catch (error) {
        console.error("An error occurred whilst trying to register a new patient", error)   
    }

