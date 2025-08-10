import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
export const runtime = 'nodejs';
export async function POST(req: Request) {
  const body = await req.text(); const sig = (await headers()).get('stripe-signature'); const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !sig) return new NextResponse('Webhook configuration missing', { status: 400 });
  let event: Stripe.Event; try { event = Stripe.webhooks.constructEvent(body, sig, secret); } catch (e:any) { return new NextResponse(`Webhook Error: ${e.message}`, { status: 400 }); }
  if (event.type === 'checkout.session.completed') { /* TODO: fulfill */ }
  return NextResponse.json({ received: true });
}
