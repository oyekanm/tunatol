"use server";

import { CurrentUser } from "@/hooks";
import { prisma } from "@/lib";
import { hash } from "bcryptjs";
import { sign } from 'jsonwebtoken';


enum UserType{
  "ADMIN",
  "USER"
}

export async function RegisterUser(user: {
  email: string;
  name: string;
  password: string;
}): Promise<ActionResponse<any>> {
  try {
    const { email, name, password } = user;
    const validation = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (validation)
      return {
        success: false,
        error: `user with this email already exists!`,
      };
    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    return { success: true };
  } catch (e) {
    console.log({ e });
    return {
      success: false,
      error: `error while registering user`,
    };
  }
}

export async function GetStorageToke() {
  const {userId,user_type} = await CurrentUser()
  const user: any = UserType.ADMIN

  if (!userId) {
    return { error: 'Unauthorized' };
  }
  
    // Check if user is admin
    if (user_type !== user) {
      return {
        error: "Only admins can get this token",
      };
    }
  
  // Create a custom token with user info
  const token = sign(
    {
      uid: userId,
      role: user_type,
      exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour expiry
    },
    process.env.STORAGE_TOKEN_SECRET as any
  );
  
  return { token };
}