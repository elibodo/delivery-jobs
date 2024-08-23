import Stripe from "stripe";
import { stripe } from "@lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { connectToDB } from "@utils/database";
import Employer from "@models/employer";

export async function POST(req) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature");
  let event = Stripe.event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return new NextResponse("Invalid Signature", { status: 400 });
  }

  const session = event.data.object;
  try {
    switch (event.type) {
      case "checkout.session.completed":
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription
        );

        try {
          await connectToDB();
          const account = await Employer.findOne({
            email: session.customer_email,
          });

          let totalJobs;

          if (subscription.plan.product === "prod_QfPX69eZFheIvk") {
            totalJobs = 2;
          } else if (subscription.plan.product === "prod_QfPX5JAEOPbEmT") {
            totalJobs = 5;
          } else if (subscription.plan.product === "prod_QfPYlxmROOBMQq") {
            totalJobs = 99999;
          } else {
            totalJobs = 0;
          }

          account.Subscription = subscription.plan.product;
          account.CustomerId = subscription.customer;
          account.Access = true;
          account.JobLimit = totalJobs;
          await account.save();
        } catch (error) {
          return new NextResponse("Failed to fetch account", { status: 500 });
        }
        break;
      case "customer.subscription.updated":
        try {
          const account = await Employer.findOne({
            CustomerId: session.customer,
          });

          let totalJobs;

          if (session.plan.product === "prod_QfPX69eZFheIvk") {
            totalJobs = 2;
          } else if (session.plan.product === "prod_QfPX5JAEOPbEmT") {
            totalJobs = 5;
          } else if (session.plan.product === "prod_QfPYlxmROOBMQq") {
            totalJobs = 99999;
          } else {
            totalJobs = 0;
          }

          account.Subscription = session.plan.product;
          account.JobLimit = totalJobs;
          await account.save();
        } catch (error) {
          return new NextResponse("Failed to fetch account", { status: 500 });
        }

        break;

      case "customer.subscription.deleted":
        try {
          await connectToDB();
          const account = await Employer.findOne({
            CustomerId: session.customer,
          });
          console.log(account);

          account.Subscription = "";
          account.CustomerId = "";
          account.Access = false;
          account.JobLimit = 0;
          await account.save();
        } catch (error) {
          return new NextResponse("Failed to fetch account", { status: 500 });
        }
        break;
      default:
        console.log(event.type);

        break;
    }
  } catch (error) {
    console.log("Stripe Error: ", event.type, ", ", error);
  }

  return new NextResponse("OK", { status: 200 });
}
