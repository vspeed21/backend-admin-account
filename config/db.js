import mongoose from "mongoose";

async function connectDB() {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    const url = `${db.connection.host}:${db.connection.port}`;
    console.log(`Mongo working on ${url}`);

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default connectDB;