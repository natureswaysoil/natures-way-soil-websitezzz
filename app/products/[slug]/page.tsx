import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/data/products';
import { AddToCartButton } from '@/components/AddToCartButton';
import { CheckoutButton } from '@/components/CheckoutButton';
import { formatUSD } from '@/lib/cart';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getProductBySlug(params.slug);
  if (!p) return notFound();
  return (
    <div className="p-8 max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-semibold">{p.name}</h1>
      <div className="text-lg">{formatUSD(p.priceCents)}</div>
      <div className="flex gap-3 pt-2">
        <AddToCartButton id={p.id} name={p.name} amount={p.priceCents} />
        <CheckoutButton items={[{ name:p.name, amount:p.priceCents, quantity:1 }]} />
      </div>
      <p className="opacity-70 pt-4">Product details coming soon.</p>
    </div>
  );
}
