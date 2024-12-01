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
  userId: z.string().min(2),
  totalCost: z.coerce
    .number()
    .gte(1, { message: "Price value must be atleast 1 character" }),
  startDate: z.date() ,
  endDate: z.date(),
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
  rating: z.number(),
  comment: z.string(),
  userId: z.string(),
});
