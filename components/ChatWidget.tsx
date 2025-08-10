import dynamic from 'next/dynamic';

// Load the client-only streaming widget on the client side only
const ChatWidget = dynamic(() => import('./ChatWidgetStreaming'), { ssr: false });

export default ChatWidget;
