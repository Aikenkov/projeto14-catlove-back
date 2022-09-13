import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
    await mongoClient.connect();
    console.log("MongoDB conectado");
} catch (err) {
    console.log(err.message);
}

const db = mongoClient.db("catlove");

export default db;
