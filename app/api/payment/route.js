import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { metadata } from "@app/layout";

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let data = await req.json();
  let priceId = data.priceId;
  let userEmail = data.user;
  let userId = data.id;

  // Apply the coupon to all prices
  let discounts = [
    {
      coupon: "f18slwiu",
    },
  ];

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: "https://deliveryjobs.com/",
    cancel_url: "https://deliveryjobs.com/",
    customer_email: userEmail,
    metadata: {
      userId: userId,
      userEmail: userEmail,
    },
    discounts: discounts, // Always apply the discount
  });

  return NextResponse.json(session.url);
}
