import clientPromise from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

type User = {
  name: string;
};


export default  async function POST(
    req: NextRequest,
  ) {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ message: 'Missing name or email' });
    }
  
    const client = await clientPromise;
    const db = client.db('igb');
    const result = await db.collection<User>('users').insertOne({ name });
    res.status(201).json(result);
  }