import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';

export async function POST(req) {
  await dbConnect();

  const { userId, highestStreak, wrongGuess } = await req.json();

  try {
    let user = await User.findOne({ userId });
    console.log('User:', user , 'userId:', userId, 'highestStreak:', highestStreak, 'wrongGuess:', wrongGuess);

    if (!user) {
      user = new User({ userId, highestStreak: highestStreak || 0 });
    } 

    user.highestStreak = Math.max(user.highestStreak, highestStreak);
    if (wrongGuess) {
      const isWordAlreadyGuessed = user.wrongGuesses.some(guess => guess.word === wrongGuess.word);
      if (!isWordAlreadyGuessed) {
        user.wrongGuesses.push(wrongGuess);
        if (user.wrongGuesses.length > 30) {
          user.wrongGuesses.shift();
        }
      }
    }
    

    await user.save();
    return NextResponse.json({ message: 'User data updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ message: 'Error updating user' }, { status: 500 });
  }
}
