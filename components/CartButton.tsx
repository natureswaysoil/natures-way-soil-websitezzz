'use client';
import Link from 'next/link'; import { useCart } from '@/lib/cart';
export function CartButton({className=''}:{className?:string}) {
  const { count } = useCart();
  return <Link href="/cart" className={`inline-flex items-center gap-2 px-3 py-2 rounded border ${className}`}>
    <span>Cart</span><span className="inline-flex items-center justify-center text-sm w-6 h-6 rounded-full bg-emerald-700 text-white">{count}</span>
  </Link>;
}
