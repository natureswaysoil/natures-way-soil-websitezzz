import { NextRequest, NextResponse } from 'next/server';
import { openai } from '../../../../lib/openai'; // <-- relative path (no @)

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

    const completion = await openai.chat.completions.create({
      model,
      messages: Array.isArray(messages) ? messages : [{ role: 'user', content: 'Hello!' }],
    });

    const reply = completion.choices[0]?.message?.content ?? '';
    return NextResponse.json({ reply }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
