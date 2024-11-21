"use server";

import { prisma } from "@/lib";
import { hash } from "bcryptjs";

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
