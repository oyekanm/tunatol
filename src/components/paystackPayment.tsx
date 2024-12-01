"use client"

import { CurrentUser } from '@/hooks';
import React from 'react'
import { PaystackButton, usePaystackPayment } from 'react-paystack'
import { useStoreContext } from './provider/storeProvider';
import { Button } from './reusable';
import { HookConfig } from 'react-paystack/dist/types';

type Props = {
  total:number;
  // user:
}

export default function PaystackPayment() {
  const {createBooking} = useStoreContext()
  const config:HookConfig = {
    reference: (new Date()).getTime().toString(),
    email: "user@example.com",
    amount: 20000 * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey:process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
};

console.log(process.env.PAYSTACK_SECRET_KEY, process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY)

// you can call this function anything
const onSuccess = (reference:any) => {
  console.log(reference);
  // createBooking()
};

// you can call this function anything
const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log('closed')
}
const initializePayment = usePaystackPayment(config);
const makeReservation = ()=>{
  initializePayment({onSuccess, onClose})
}
return (
  <div>
      <Button text='Reserve' clx='text-[1.8rem] py-8 w-full' click={makeReservation} />
  </div>
);
}


// export default function PaystackPayment() {
//     const componentProps = {
//         email : "enitanboluwatife5@gmail.com",
//         amount : 1000 * 100,
//         metadata: {
//           name:"bolu",
//           phone :"773633",
//         },
//         publicKey:"pk_test_999e0355ac3cce73ff27369852b86dca3debfd42",
//         text: "Pay Now",
//         onSuccess: (ref:any) =>{
//           if(ref.status === "success")
//           console.log(ref)
//           alert("Thanks for doing business with us! Come back soon!!")
//         },
//         onClose: () => alert("Wait! You need this oil, don't go!!!!"),
//       }
//   return (
//     <PaystackButton  className="paystack-button" {...componentProps} />
//   )
// }
