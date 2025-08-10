import dynamic from 'next/dynamic';
// Use relative path to avoid alias
const ChatWidget = dynamic(() => import('../../components/ChatWidgetStreaming'), { ssr: false });

export default function Page() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Chat with us</h1>
      <ChatWidget />
    </div>
  );
}
