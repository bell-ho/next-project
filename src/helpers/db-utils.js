import { MongoClient } from 'mongodb';

export async function connectDatabase(res) {
  let client;

  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.xet6ul3.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

  try {
    client = await MongoClient.connect(connectionString);
  } catch (e) {
    res.status(500).json({ message: 'Connect failed' });
    return;
  }
  return client;
}

export const insertDocuments = async (client, collection, document, res) => {
  const db = client.db();

  try {
    const result = await db.collection(collection).insertOne(document);
    client.close();
    return result;
  } catch (e) {
    res.status(500).json({ message: 'Insert failed' });
  }
};

export const getAllDocuments = async (client, collection, sort, filter = {}, res) => {
  const db = client.db();

  try {
    const result = await db.collection(collection).find(filter).sort(sort).toArray();
    client.close();
    return result;
  } catch (e) {
    res.status(500).json({ message: 'Get failed' });
  }
};
