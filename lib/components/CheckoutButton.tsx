'use client';
import * as React from 'react';
export function CheckoutButton({ items }: { items?: { name:string; amount:number; quantity?:number }[] }) {
  const [loading,setLoading]=React.useState(false);
  const go=async()=>{ try{ setLoading(true);
    const r=await fetch('/api/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:items?.length?items:[{name:"Dog Urine Neutralizer — 1 gal",amount:3999,quantity:1}]})});
    const d=await r.json(); if(d?.url) location.href=d.url; else alert(d?.error||'Checkout failed');
  } finally { setLoading(false); } };
  return <button onClick={go} disabled={loading} className="px-4 py-2 rounded bg-green-700 text-white">{loading?'Redirecting…':'Buy Now (Stripe)'}</button>;
}
