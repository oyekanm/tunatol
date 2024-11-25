"use server";

import { CurrentUser } from "@/hooks";
import { prisma } from "@/lib";
import { deleteFirebaseFile } from "@/utils";
import { validateRoomOwnership } from "@/utils/validations";

// TODO: create aa useable auth check

export async function CreateBooking(
  booking: Booking,transaction:Transaction
): Promise<ActionResponse<Booking>> {
  const { userId, user_type } = await CurrentUser();
  const user: any = "ADMIN";
  const { endDate, roomId, startDate, totalCost } = booking;
  const {paymentMethod} = transaction

  try {
    // Authentication check
    if (!userId) {
      return {
        success: false,
        error: " Unauthorized to reserve a room",
      };
    }

    // create products
    const newBooking = await prisma.booking.create({
      data: {
        endDate,
        startDate,
        totalCost,
        roomId,
        userId,
        status: "RESERVED",
        type: user_type === user ? "OFFLINE" : "ONLINE",
        Transaction:{
          create:{
            amount:totalCost,
            paymentMethod,
            status:"SUCCESSFUL",
            type:"PAYMENT",
          }
        }
      },
    });
    return { success: true, data: newBooking };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: `error while creating a room.`,
    };
  }
}
// export async function CreateReFund(
//   refund: Transaction
// ): Promise<ActionResponse<Booking>> {
//   const { userId, user_type } = await CurrentUser();
//   const user: any = "ADMIN";
//   const { amount,paymentMethod,status,type,bookingId } = refund;

//   try {
//     // Authentication check
//     if (!userId) {
//       return {
//         success: false,
//         error: " Unauthorized to reserve a room",
//       };
//     }

//     // create products
//     const newBooking = await prisma.booking.create({
//       data: {
//         endDate,
//         startDate,
//         totalCost,
//         roomId,
//         userId,
//         status: "RESERVED",
//         type: user_type === user ? "OFFLINE" : "ONLINE",
//       },
//     });
//     return { success: true, data: newBooking };
//   } catch (error) {
//     console.log(error);
//     return {
//       success: false,
//       error: `error while creating a room.`,
//     };
//   }
// }
