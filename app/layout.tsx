import { CartProvider } from '@/lib/cart';
import Link from 'next/link';

export const metadata = { title: "Nature's Way Soil", description: 'Organic soil & lawn products' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="p-4 border-b flex items-center justify-between">
          <Link href="/" className="font-semibold">Nature&apos;s Way Soil</Link>
          <nav className="flex gap-4">
            <Link href="/products">Products</Link>
            <Link href="/cart">Cart</Link>
          </nav>
        </header>
        <CartProvider>
          <main className="p-6">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
