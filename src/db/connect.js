import dns from 'dns';
import { MongoClient } from 'mongodb';

dns.setServers(['8.8.8.8']);

let database;

const connectToDb = async () => {

  const connectionString = process.env.MONGODB_URI;

  if (!connectionString) {

    throw new Error('MONGODB_URI is required.');

  }

 // const client = new MongoClient(connectionString);//
const client = new MongoClient(connectionString, {
  serverSelectionTimeoutMS: 10000,
  tls: true
});

  await client.connect();

  database = client.db(process.env.MONGODB_DB_NAME || 'practice');

  return database;

};

const getDb = () => {

  if (!database) {

    throw new Error('Database not initialized. Call connectToDb first.');

  }

  return database;

};

export { connectToDb, getDb };