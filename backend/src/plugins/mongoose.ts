import mongoose from 'mongoose'

export const connectToDb = async (mongodbConnectionString: string) => {
  await mongoose.connect(mongodbConnectionString)
}
