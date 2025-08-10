import { NextRequest } from 'next/server';
import { openai } from '@/lib/openai';

export const runtime = 'nodejs'; // use Node runtime for streaming

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  // Start a streamed chat completion
  const completion = await openai.chat.completions.create({
    model,
    stream: true,
    messages: Array.isArray(messages) ? messages : [{ role: 'user', content: 'Hello!' }],
  });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const part of completion) {
          const delta = part.choices?.[0]?.delta?.content ?? '';
          if (delta) controller.enqueue(encoder.encode(delta));
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Transfer-Encoding': 'chunked',
    },
  });
}
