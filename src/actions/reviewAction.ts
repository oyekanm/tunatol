"use server"

import { prisma } from "@/lib";
import { reviewSchema } from "@/lib/schema/roomSchema";

export async function createReview(review: Review) {
  const results = reviewSchema.safeParse(review);
  if (results.success) {
    //   const { userId, color, quantity, size, } = results.data;
    try {
      const createOrder = await prisma.reviews.create({
        data: results.data,
      });
      return { data: createOrder };
    } catch (error) {
      console.log(error);
    }
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
