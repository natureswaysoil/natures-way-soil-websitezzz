'use client';
import * as React from 'react';
export type CartItem = { id: string; name: string; amount: number; quantity: number };
type Ctx = {
  items: CartItem[]; addItem: (i: CartItem)=>void; removeItem:(id:string)=>void; updateQty:(id:string,q:number)=>void;
  clearCart:()=>void; count:number; totalAmount:number;
};
const CartContext = React.createContext<Ctx|null>(null);
const KEY='nws_cart_v1';
const load=()=>{ if(typeof window==='undefined')return[]; try{const r=localStorage.getItem(KEY); return r?JSON.parse(r).items||[]:[];}catch{return[]}};
export function CartProvider({children}:{children:React.ReactNode}) {
  const [items,setItems]=React.useState<CartItem[]>([]);
  React.useEffect(()=>{setItems(load())},[]);
  React.useEffect(()=>{if(typeof window!=='undefined')localStorage.setItem(KEY,JSON.stringify({items}))},[items]);
  const addItem=(item:CartItem)=>setItems(p=>{const e=p.find(i=>i.id===item.id);return e?p.map(i=>i.id===item.id?{...i,quantity:i.quantity+item.quantity}:i):[...p,item]});
  const removeItem=(id:string)=>setItems(p=>p.filter(i=>i.id!==id));
  const updateQty=(id:string,q:number)=>setItems(p=>p.map(i=>i.id===id?{...i,quantity:Math.max(1,q)}:i));
  const clearCart=()=>setItems([]);
  const count=items.reduce((a,i)=>a+i.quantity,0);
  const totalAmount=items.reduce((a,i)=>a+i.amount*i.quantity,0);
  return <CartContext.Provider value={{items,addItem,removeItem,updateQty,clearCart,count,totalAmount}}>{children}</CartContext.Provider>;
}
export function useCart(){const c=React.useContext(CartContext); if(!c) throw new Error('useCart must be used within CartProvider'); return c;}
export const formatUSD=(c:number)=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(c/100);
