import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
