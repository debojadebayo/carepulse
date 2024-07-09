import { z } from "zod";


export const UserValidationSchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2charactes",
    }).max(50),
    email: z.string().email("Invalid email address"),
    phone: z.string().refine((phone)=> /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  })