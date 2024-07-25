import clientPromise from '../../lib/mongodb';
import { getClientIp } from 'request-ip';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('wordwrangle');
  const collection = db.collection('users');

  const ip = getClientIp(req) || 'unknown';
  const { highestStreak, wrongGuess } = req.body;

  const user = await collection.findOne({ ip });

  if (!user) {
    await collection.insertOne({
      ip,
      highestStreak: highestStreak || 0,
      wrongGuesses: wrongGuess ? [wrongGuess] : [],
    });
  } else {
    await collection.updateOne(
      { ip },
      {
        $set: { highestStreak: Math.max(user.highestStreak, highestStreak) },
        $push: { wrongGuesses: { $each: [wrongGuess], $slice: -50 } },
      }
    );
  }

  res.status(200).json({ message: 'User data updated successfully' });
}
