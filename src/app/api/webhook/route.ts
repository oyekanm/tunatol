// app/api/webhook/route.ts
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib';
import { CreateTransaction } from '@/actions/bookingActions';

// Your secret key should be in .env.local
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;

// Helper function to verify Paystack signature
function verifyWebhookSignature(body: any, paystackSignature: string) {
  const hash = crypto
    .createHmac('sha512', PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(body))
    .digest('hex');
  
  return hash === paystackSignature;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const headersList = headers();
    const paystackSignature = headersList.get('x-paystack-signature');

    // Verify the webhook is from Paystack
    if (!paystackSignature || !verifyWebhookSignature(body, paystackSignature)) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    const { event, data } = body;

    // Handle different webhook events
    switch (event) {
      case 'charge.success':
        await handleSuccessfulPayment(data);
        break;
      
      case 'refund.processed':
        await handleRefund(data);
        break;
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// Handle successful payment
async function handleSuccessfulPayment(data: any) {
  const {
    reference,
    amount,
    customer,
    status,
    paid_at,
    metadata,
    channel,
    authorization

  } = data;

  
  // First verify with Paystack directly
  const {custom_fields } = metadata;
  const verifiedTx = await verifyTransaction(reference);
  
  console.log("custom",custom_fields,data)
  if (verifiedTx.status === 'success') {
    // Create a transaction in db
    const trax:any = {
        amount:amount / 100,
        card_type:authorization?.card_type || null,
        paymentMethod:channel,
        reference,
        bookingId:"hheke",
        customerEmail: customer.email
    }

    await CreateTransaction(trax)

    // Send confirmation email using your email service
    // await sendPaymentConfirmation(customer.email, reference);
  }
}

// Handle refund processing
async function handleRefund(data: any) {
  const {
    reference,
    amount,
    status,
    transaction_reference,
    settlement_date
  } = data;

  console.log(data)

  // Verify refund with Paystack
//   const verifiedRefund = await verifyRefund(reference);
  
//   if (verifiedRefund.status === 'processed') {
//     // Update your database with refund information
//     await prisma.order.update({
//       where: { reference: transaction_reference },
//       data: {
//         status: 'refunded',
//         refundReference: reference,
//         refundAmount: amount / 100,
//         refundedAt: new Date(settlement_date)
//       }
//     });

//     // Send refund confirmation email
//     const order = await prisma.order.findUnique({
//       where: { reference: transaction_reference }
//     });
    
//     if (order) {
//       await sendRefundConfirmation(order.customerEmail, reference);
//     }
//   }
}

// Verify transaction with Paystack
async function verifyTransaction(reference: string) {
  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    }
  );
  
  return response.json();
}

// Verify refund with Paystack
async function verifyRefund(reference: string) {
  const response = await fetch(
    `https://api.paystack.co/refund/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    }
  );
  
  return response.json();
}