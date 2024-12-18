"use server";

import { CurrentUser } from "@/hooks";
import { prisma } from "@/lib";
import { deleteFirebaseFile } from "@/utils";
import { validateRoomOwnership } from "@/utils/validations";

// TODO: create aa useable auth check
enum UserType {
  "ADMIN",
  "USER",
}

export async function CreateFacility(
  facility: Facility
): Promise<ActionResponse<Facility>> {
  const { userId, user_type } = await CurrentUser();
  const user: any = "ADMIN";
  const { image, name } = facility;

  // console.log(user, user_type);
  try {
    // check db for incoming product details
    const unique = await prisma.facility.findFirst({
      where: {
        name: name,
      },
    });

    if (unique) {
      return {
        success: false,
        error: `${unique.name} already exists!, try another another name`,
      };
    }

    // Authentication check
    if (!userId) {
      return {
        success: false,
        error: " Unauthorized to create a facility",
      };
    }

    // Check if user is admin
    if (user_type !== user) {
      return {
        success: false,
        error: "Only admins can create facility",
      };
    }

    // create products
    const newFacility = await prisma.facility.create({
      data: {
        name,
        userId,
        image:{
          create:{
            url: image.url,    // Required
            key: image.key,    // Required
            userId,
          }
        } 
      },
    });
    return { success: true, data: newFacility as Facility };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: `error while creating a room.`,
    };
  }
}
export async function UpdateRoom(
  room: Room,
  id: string
): Promise<ActionResponse<Room>> {
  const { userId, user_type } = await CurrentUser();
  const user: any = "ADMIN";
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
  } = room;

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
    if (user_type !== user) {
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

    // update products
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
        Reviews: true,
      },
    });
    return { success: true, data: updatedRoom as Room };
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
  const { userId, user_type } = await CurrentUser();
  const user: any = "ADMIN";
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
    if (user_type !== user) {
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
