import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("MONGO_URI não definido no .env");
  process.exit(1);
}

const client = new MongoClient(uri);
let db = null;

export async function connectToMongo() {
  try {
    await client.connect();
    db = client.db(process.env.MONGO_DB_NAME || "Universidade");
    console.log("Conectado ao MongoDB");
    return db;
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err);
    process.exit(1);
  }
}

export function getDb() {
  if (!db) {
    throw new Error("Você deve conectar primeiro usando connectToMongo()");
  }
  return db;
}
