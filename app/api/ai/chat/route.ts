import { NextRequest } from 'next/server';
import { openai } from '@/lib/openai';

export const runtime = 'nodejs'; // ensure Node runtime for the SDK

export async function POST(req: NextRequest) {
  const { messages } = await req.json(); // [{role:'user'|'assistant'|'system', content:string}, ...]

  // Use Chat Completions (simple) — or swap to Responses API if you prefer
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  const completion = await openai.chat.completions.create({
    model,
    messages: Array.isArray(messages) ? messages : [{ role: 'user', content: 'Hello!' }],
  });

  const reply = completion.choices[0]?.message?.content ?? '';
  return Response.json({ reply });
}
