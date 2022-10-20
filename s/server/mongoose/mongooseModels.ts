import mongoose from "mongoose"
import { casesSchema, userSchema } from "./mongooseSchemas.js"

export const User = mongoose.model('users', userSchema)
export const cases = mongoose.model('cases', casesSchema)