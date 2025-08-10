import Link from 'next/link';
import { products } from '@/data/products';
import { AddToCartButton } from '@/components/AddToCartButton';
import { CheckoutButton } from '@/components/CheckoutButton';
import { formatUSD } from '@/lib/cart';

export default function ProductsPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <h1 className="text-3xl font-semibold">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map(p=>(
          <div key={p.slug} className="border rounded p-4 space-y-3">
            <Link href={`/products/${p.slug}`} className="text-lg font-medium hover:underline">{p.name}</Link>
            <div className="text-sm opacity-70">{formatUSD(p.priceCents)}</div>
            <div className="flex gap-3">
              <AddToCartButton id={p.id} name={p.name} amount={p.priceCents} />
              <CheckoutButton items={[{ name:p.name, amount:p.priceCents, quantity:1 }]} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
