import dynamic from 'next/dynamic';

const ChatWidgetStreaming = dynamic(() => import('@/components/ChatWidgetStreaming'), { ssr: false });

export default function Home() {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Welcome to Nature&apos;s Way Soil</h1>
        <p>Ask us anything below or browse products.</p>
      </div>

      <ChatWidgetStreaming />
    </div>
  );
}
