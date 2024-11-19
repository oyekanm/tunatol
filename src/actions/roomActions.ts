"use server";

import { useCurrentUser } from "@/hooks";
import { prisma } from "@/lib";
import { validateRoomOwnership } from "@/utils/validations";

// TODO: create aa useable auth check

export async function CreateRoom(
  FormData: FormData
): Promise<ActionResponse<Room>> {
  const { userId, user_type } = await useCurrentUser();
  const {
    description,
    features,
    images,
    name,
    price,
    available_announcement,
    discount_percent,
    isAvailable
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
    // check db for incoming product details
    const unique = await prisma.room.findFirst({
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
        error: " Unauthorized to create a room",
      };
    }

    // Check if user is admin
    if (user_type !== UserType.ADMIN) {
      return {
        success: false,
        error: "Only admins can create rooms",
      };
    }

    // create products
    const newRoom = await prisma.room.create({
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
    return { success: true, data: newRoom as Room };
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
  const { exist, user } = await validateRoomOwnership(userId, id);
  const {
    description,
    features,
    images,
    name,
    price,
    available_announcement,
    discount_percent,
    isAvailable
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
    if (!user) {
      return {
        success: false,
        error: "Unauthorized to delete this resource",
      };
    }

    // create products
    const newRoom = await prisma.room.update({
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
          updateMany: {
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
    return { success: true, data: newRoom as Room };
  } catch (error) {
    console.log(error);
    console.error('Room update error:', error)
    return {
      error: `error while creating a room.`,
    };
  }
}

export async function createResource(
  userId: string,
  data: any
): Promise<ActionResponse<any>> {
  try {
    // 1. Check user authorization
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    // 2. Check user limits
    const userResourceCount = await prisma.resource.count({
      where: { userId },
    });

    if (userResourceCount >= MAX_RESOURCES_PER_USER) {
      return {
        success: false,
        error: "Resource limit reached",
      };
    }

    // 3. Validate required fields
    const requiredFields = ["name", "description", "price"];
    const missingFields = requiredFields.filter((field) => !data[field]);

    if (missingFields.length > 0) {
      return {
        success: false,
        error: `Missing required fields: ${missingFields.join(", ")}`,
      };
    }

    // 4. Check for duplicates
    if (data.uniqueField) {
      const duplicate = await prisma.resource.findFirst({
        where: { uniqueField: data.uniqueField },
      });

      if (duplicate) {
        return {
          success: false,
          error: "Resource with this unique field already exists",
        };
      }
    }

    // Perform create operation
    // ...

    return { success: true };
  } catch (error) {
    console.error("Create operation failed:", error);
    return {
      success: false,
      error: "Failed to create resource",
    };
  }
}

export async function deleteResource(
  resourceId: string,
  userId: string
): Promise<ActionResponse<void>> {
  try {
    // 1. Check if resource exists
    const existingResource = await prisma.resource.findUnique({
      where: { id: resourceId },
    });

    if (!existingResource) {
      return {
        success: false,
        error: "Resource not found",
      };
    }

    // 2. Check authorization
    if (!(await validateOwnership(userId, resourceId))) {
      return {
        success: false,
        error: "Unauthorized to delete this resource",
      };
    }

    // 3. Check for dependencies/relations
    const hasActiveBookings = await prisma.booking.findFirst({
      where: {
        resourceId,
        status: "ACTIVE",
      },
    });

    if (hasActiveBookings) {
      return {
        success: false,
        error: "Cannot delete: resource has active bookings",
      };
    }

    // Perform delete operation
    // ...

    return { success: true };
  } catch (error) {
    console.error("Delete operation failed:", error);
    return {
      success: false,
      error: "Failed to delete resource",
    };
  }
}
