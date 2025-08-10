'use client';
import { useCart, formatUSD } from '@/lib/cart';
import { CheckoutButton } from '@/components/CheckoutButton';

export default function CartPage() {
  const { items, updateQty, removeItem, totalAmount, clearCart } = useCart();
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-semibold">Your Cart</h1>
      {items.length === 0 ? <p>Your cart is empty.</p> : (
        <div className="space-y-4">
          {items.map(i=>(
            <div key={i.id} className="flex items-center justify-between border p-3 rounded">
              <div className="flex-1"><div className="font-medium">{i.name}</div><div className="text-sm opacity-70">{formatUSD(i.amount)}</div></div>
              <div className="flex items-center gap-2">
                <button className="px-2 py-1 border rounded" onClick={()=>updateQty(i.id, Math.max(1, i.quantity-1))}>-</button>
                <span className="w-8 text-center">{i.quantity}</span>
                <button className="px-2 py-1 border rounded" onClick={()=>updateQty(i.id, i.quantity+1)}>+</button>
              </div>
              <div className="w-24 text-right font-medium">{formatUSD(i.amount * i.quantity)}</div>
              <button className="ml-4 text-red-600" onClick={()=>removeItem(i.id)}>Remove</button>
            </div>
          ))}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-xl font-semibold">Total: {formatUSD(totalAmount)}</div>
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded border" onClick={clearCart}>Clear</button>
              <CheckoutButton items={items.map(i=>({ name:i.name, amount:i.amount, quantity:i.quantity }))} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
