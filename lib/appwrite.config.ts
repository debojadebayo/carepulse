import * as sdk from "node-appwrite"

const { 
    PROJECT_ID, 
    API_SECRET_KEY, 
    DATABASE_ID, 
    PATIENT_COLLECTION_ID, 
    DOCTORS_COLLECTION_ID, 
    APPOINTMENTS_COLLECTION_ID, 
    NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT: ENDPOINT} = process.env


const client = new sdk.Client()

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_SECRET_KEY!)

export const databases = new sdk.Databases(client)
export const storage = new sdk.Storage(client)
export const users = new sdk.Users(client)
export const messaging = new sdk.Messaging(client)






