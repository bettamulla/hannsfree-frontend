import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST() {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "gbp",
          product_data: {
            name: "HannsFree – Brand Engine Access"
          },
          unit_amount: 1000
        },
        quantity: 1
      }
    ],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?canceled=true`
  });

  return NextResponse.json({ url: session.url });
}

