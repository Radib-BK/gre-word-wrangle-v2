import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';

export async function GET(req) {
  await dbConnect();
  
  const gwwUserId = req.nextUrl.searchParams.get('gwwUserId');
  if (!gwwUserId) {
    return NextResponse.json({ error: 'User ID not provided' }, { status: 400 });
  }

  const user = await User.findOne({ gwwUserId });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ highestStreak: user.highestStreak, wrongGuesses: user.wrongGuesses });
}
