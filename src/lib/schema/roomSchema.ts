"use client";

import { z } from "zod";

export const roomSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "name must be atleast 2 characters"),
  description: z.string().min(2, "description must be atleast 10 characters"),
  price: z.coerce
    .number()
    .gte(1, { message: "Price value must be atleast 1 character" }),
  features: z.array(z.string()),
  discount_percent: z.coerce.number().optional(),
  available_announcement: z.string().optional(),
  images: z.array(
    z.object({
      id: z.string().optional(),
      key: z.string(),
      url: z.string(),
    })
  ).min(1,"image is Required"),
  isAvailable:z.boolean()
});
export const bookingSchema = z.object({
  id: z.string().optional(),
  roomId: z.string().min(2),
  userId: z.string().min(5,{message:"you need to login to reserve"}),
  totalCost: z.coerce
    .number()
    .gte(1, { message: "select dates to get a price" }),
  startDate: z.date().min(new Date(2024-10-14),{message:"select a check-in date"}) ,
  endDate: z.date().min(new Date(2024-10-14),{message:"select a check-out date"}),
});
export const facilitySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "name must be atleast 2 characters"),
  image: z.object({
    id: z.string().optional(),
    key: z.string(),
    url: z.string(),
  }),
});

export const Image = z.object({
  id: z.string().optional(),
  key: z.string(),
  url: z.string(),
});

export const reviewSchema = z.object({
  id: z.string().optional(),
  roomId: z.string(),
  rating:z.coerce
  .number()
  .gte(1, { message: "please add a star rating" }),
  comment: z.string().min(2, "please add a comment"),
  userId: z.string(),
});
