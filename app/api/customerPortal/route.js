import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let data = await req.json();
  let customerId = data.customer;

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: "http://localhost:3000",
  });

  return NextResponse.json(session.url);
}
