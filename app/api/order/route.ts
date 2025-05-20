import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  const { amount, currency = "INR" } = await request.json();

  const options = {
    amount: amount * 100, 
    currency,
    receipt: `receipt#${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    return NextResponse.json({ orderId: order.id });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
