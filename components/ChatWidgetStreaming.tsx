'use client';

import * as React from 'react';

type Msg = { role: 'user' | 'assistant'; content: string };

export default function ChatWidgetStreaming() {
  const [history, setHistory] = React.useState<Msg[]>([]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  async function send() {
    if (!input.trim()) return;
    const next = [...history, { role: 'user', content: input }];
    setHistory(next);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/ai/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: "You are a helpful assistant for Nature’s Way Soil." },
          ...next,
        ],
      }),
    });

    if (!res.body) {
      setLoading(false);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let assistant = '';

    // Add an empty assistant bubble we’ll fill as tokens arrive
    setHistory(h => [...h, { role: 'assistant', content: '' }]);

    // Stream tokens and update the last assistant message
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      assistant += decoder.decode(value, { stream: true });
      setHistory(h => {
        const copy = [...h];
        copy[copy.length - 1] = { role: 'assistant', content: assistant };
        return copy;
      });
    }

    setLoading(false);
  }

  return (
    <div className="max-w-xl border rounded p-4 space-y-3">
      <div className="space-y-2 max-h-72 overflow-auto">
        {history.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right' : ''}>
            <span className={`inline-block px-3 py-2 rounded ${m.role === 'user' ? 'bg-green-100' : 'bg-gray-100'}`}>
              {m.content}
            </span>
          </div>
        ))}
        {loading && (
          <div>
            <span className="inline-block px-3 py-2 rounded bg-gray-100 opacity-70 animate-pulse">
              Thinking…
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Ask us about products, usage, shipping…"
        />
        <button onClick={send} disabled={loading} className="px-4 py-2 rounded bg-green-700 text-white">
          Send
        </button>
      </div>
    </div>
  );
}
