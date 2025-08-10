import Link from 'next/link';
export default function Home() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Welcome to Nature&apos;s Way Soil</h1>
      <p>Explore our products and checkout with Stripe.</p>
      <Link href="/products" className="underline">Go to Products</Link>
    </div>
  );
}
