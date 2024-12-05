"use server"

import { CurrentUser } from "@/hooks";
import { prisma } from "@/lib";
import { reviewSchema } from "@/lib/schema/roomSchema";
import { revalidatePath } from "next/cache";

export async function createReview(review: Review,path:string) {
  const { userId, user_type } = await CurrentUser();
  // const results = reviewSchema.safeParse(review);
    //   const { userId, color, quantity, size, } = results.data;

    // console.log(path)
      // Authentication check
      if (!userId) {
        return {
          success: false,
          error: " Unauthorized to create a room",
        };
      }
    try {
      const createOrder = await prisma.reviews.create({
        data: review as any,
      });
      console.log("created")
      // revalidatePath(path)
      return { data: createOrder, success:true };
    } catch (error) {
      console.log(error);
    }
}

export async function updateReview(order: Review, id: string) {
  const results = reviewSchema.safeParse(order);
  if (results.success) {
    try {
      const createOrder = await prisma.reviews.update({
        where: { id },
        data: results.data,
      });
      return { data: createOrder };
    } catch (error) {
      console.log(error);
    }
  }
}
export async function deleteReview(id: string) {
  try {
    const createOrder = await prisma.reviews.delete({
      where: { id },
    });
    return { data: createOrder };
  } catch (error) {
    console.log(error);
  }
}
