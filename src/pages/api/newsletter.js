import { connectDatabase, insertDocuments } from '@/helpers/db-utils';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' }); // 입력값 유효하지 않음
      return;
    }

    const client = await connectDatabase(res);
    await insertDocuments(client, 'newsletter', { email: userEmail }, res);

    res.status(201).json({ message: 'sign up' });
  }
};
export default handler;
