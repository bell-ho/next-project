import fs from 'fs';
import path from 'path';
import { connectDatabase, getAllDocuments, insertDocuments } from '@/helpers/db-utils';

export const buildCommentPath = () => {
  return path.join(process.cwd(), 'src/data', 'comment.json');
};
export const extractComment = (filePath) => {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
};
export const filteredComment = (eventId) => {
  const filePath = buildCommentPath();
  const data = extractComment(filePath);

  return data.filter((value) => value.eventId === eventId);
};

const handler = async (req, res) => {
  const eventId = req.query.eventId;

  const client = await connectDatabase(res);

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
      res.status(442).json({ message: 'Invalid input' });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const result = await insertDocuments(client, 'comments', newComment, res);

    res.status(201).json({ message: 'success', comment: result.insertedId });
  }

  if (req.method === 'GET') {
    const documents = await getAllDocuments(client, 'comments', { _id: -1 }, { eventId }, res);

    res.status(200).json({ comments: documents });
  }
};
export default handler;
