import mongoose from 'mongoose'

export const connection = mongoose.connect(process.env.DB_CONNECTION)