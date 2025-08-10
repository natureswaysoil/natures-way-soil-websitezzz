'use client';
import * as React from 'react';
import { useCart } from '@/lib/cart';
export function AddToCartButton({id,name,amount,quantity=1,className=''}:{id:string;name:string;amount:number;quantity?:number;className?:string;}) {
  const { addItem } = useCart(); const [loading,setLoading]=React.useState(false);
  const onAdd=()=>{ setLoading(true); addItem({id,name,amount,quantity}); setLoading(false); };
  return <button onClick={onAdd} disabled={loading} className={`px-4 py-2 rounded bg-emerald-700 text-white ${className}`}>{loading?'Adding…':'Add to Cart'}</button>;
}
