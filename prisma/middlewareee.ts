import { PrismaClient } from '@prisma/client';
import { deleteFirebaseFile } from '@/utils';

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  // Monitor delete operations on Room
  if (params.model === 'Room' && params.action === 'delete') {
    // First get all images associated with the room
    const room = await prisma.room.findUnique({
      where: { id: params.args.where.id },
      include: { images: true }
    });

    // Delete files from Firebase after the database operation
    const result = await next(params);

    if (room?.images) {
      await Promise.all(
        room.images.map(image => deleteFirebaseFile(image.url))
      );
    }

    return result;
  }

  return next(params);
});
