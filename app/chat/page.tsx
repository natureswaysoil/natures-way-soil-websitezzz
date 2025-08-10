import dynamic from 'next/dynamic';
const ChatWidget = dynamic(() => import('@/components/ChatWidget'), { ssr: false });

export default function ChatPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Chat with us</h1>
      <ChatWidget />
    </div>
  );
}
