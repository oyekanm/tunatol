"use client"

import React from 'react'
import { PaystackButton } from 'react-paystack'

export default function PaystackPayment() {
    const componentProps = {
        email : "enitanboluwatife5@gmail.com",
        amount : 100,
        metadata: {
          name:"bolu",
          phone :"773633",
        },
        publicKey:"pk_test_999e0355ac3cce73ff27369852b86dca3debfd42",
        text: "Pay Now",
        onSuccess: () =>
          alert("Thanks for doing business with us! Come back soon!!"),
        onClose: () => alert("Wait! You need this oil, don't go!!!!"),
      }
  return (
    <PaystackButton   className="paystack-button" {...componentProps} />
  )
}
