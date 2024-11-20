"use server";

import { useCurrentUser } from "@/hooks";
import { prisma } from "@/lib";
import { deleteFirebaseFile } from "@/utils";
import { validateRoomOwnership } from "@/utils/validations";

// TODO: create aa useable auth check

export async function CreateBooking(
  FormData: FormData
): Promise<ActionResponse<Booking>> {
  const { userId, user_type } = await useCurrentUser();
  const {
 endDate,
 roomId,
 startDate,
 totalCost,
  }: Booking = {
    endDate: FormData.get("endDate") as any,
    startDate: FormData.get("startDate") as any,
    totalCost: Number(FormData.get("totalCost")) as number,
    roomId: FormData.get("roomId") as string
  };

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
        status:"RESERVED",
        type: user_type === UserType.ADMIN ? "OFFLINE":"ONLINE",
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
export async function UpdateRoom(FormData: FormData, id: string) {
  const { userId, user_type } = await useCurrentUser();
  const { exist, userCreateRoom } = await validateRoomOwnership(userId, id);
  const {
    description,
    features,
    images,
    name,
    price,
    available_announcement,
    discount_percent,
    isAvailable,
  }: Room = {
    name: FormData.get("title") as string,
    price: Number(FormData.get("price")) as number,
    description: FormData.get("description") as string,
    images: FormData.get("images") as any,
    features: FormData.get("features") as any,
    available_announcement: FormData.get("available_announcement") as string,
    discount_percent: Number(FormData.get("discount_percent")) as number,
    isAvailable: FormData.get("isAvailable") as any,
  };

  try {
    // check the user coming in first
    // Authentication check
    if (!userId) {
      return {
        success: false,
        error: " Unauthorized to create a room",
      };
    }

    // Check if user is admin
    if (user_type !== UserType.ADMIN) {
      return {
        success: false,
        error: "Only admins can update rooms",
      };
    }
    // check db for incoming product details
    if (!exist) {
      return {
        success: false,
        error: "Room not found",
      };
    }

    // 2. Check authorization
    if (!userCreateRoom) {
      return {
        success: false,
        error: "Unauthorized to delete this resource",
      };
    }

    // create products
    const updatedRoom = await prisma.room.update({
      where: { id },
      data: {
        name,
        description,
        price,
        userId,
        isAvailable,
        features,
        discount_percent,
        available_announcement,
        images: {
          createMany: {
            data: images.map((image) => ({
              url: image.url,
              key: image.key,
              userId,
            })),
          },
        },
      },
      include: {
        images: true,
      },
    });
    return { success: true, data: updatedRoom };
  } catch (error) {
    console.log(error);
    console.error("Room update error:", error);
    return {
      success: false,
      error: "Failed to update room",
    };
  }
}

export async function DeleteResource(
  id: string
): Promise<ActionResponse<string>> {
  const { userId, user_type } = await useCurrentUser();
  const { exist, userCreateRoom } = await validateRoomOwnership(userId, id);
  const images = await prisma.image.findMany({
    where: { roomId: id },
  });
  const hasActiveBookings = await prisma.booking.findFirst({
    where: {
      id,
      status: "RESERVED",
    },
  });
  try {
    // Check if room exists
    if (!exist) {
      return {
        success: false,
        error: "Room not found",
      };
    }

    // check the user coming in first
    // Authentication check
    if (!userId) {
      return {
        success: false,
        error: " Unauthorized to create a room",
      };
    }

    // Check if user is admin
    if (user_type !== UserType.ADMIN) {
      return {
        success: false,
        error: "Unauthorized. Admin access required.",
      };
    }

    //  Check if this user created the room
    if (!userCreateRoom) {
      return {
        success: false,
        error: "Unauthorized to delete this resource",
      };
    }

    // Check for active bookings
    if (hasActiveBookings) {
      return {
        success: false,
        error: "Cannot delete: this room has active bookings",
      };
    }

    // Delete room (cascades to images due to Prisma relation)
    await prisma.room.delete({
      where: { id },
    });

    // Trigger image cleanup in storage
    await Promise.all(images.map((image) => deleteFirebaseFile(image.url)));

    return {
      success: true,
      data: "Room deleted successfully",
    };
  } catch (error) {
    console.error("Room deletion error:", error);
    return {
      success: false,
      error: "Failed to delete room",
    };
  }
}
