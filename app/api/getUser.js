import clientPromise from '../../lib/mongodb';
import { getClientIp } from 'request-ip';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('wordwrangle');
  const collection = db.collection('users');

  const ip = getClientIp(req) || 'unknown';

  const user = await collection.findOne({ ip });

  if (!user) {
    await collection.insertOne({ ip, highestStreak: 0, wrongGuesses: [] });
    res.status(200).json({ highestStreak: 0, wrongGuesses: [] });
  } else {
    res.status(200).json(user);
  }
}
