import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "HannsFree Pro",
              description: "AI brand engine + saved kits"
            },
            unit_amount: 1500
          },
          quantity: 1
        }
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/?pro=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/`
    });

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: "Stripe failed" }, { status: 500 });
  }
}
