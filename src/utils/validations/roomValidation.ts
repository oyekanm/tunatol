import { prisma } from "@/lib";

export default async function validateRoomOwnership(userId: string, roomId: string) {
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      select: { userId: true }
    });

    console.log(room)
    
    return {
      exist: room === null ? false : true,
      userCreateRoom:room?.userId === userId
    };
  }