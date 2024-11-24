import { CacheService, prisma } from "@/lib";
import { CacheKeys } from "@/utils";


export default class ProductService {
  // Get all products with cache
  static async getAllRooms(skipCache = false) {
    return CacheService.fetchWithCache(
      CacheKeys.room.all,
      async () => {
        return prisma.room.findMany();
      },
      { skipCache }
    );
  }

  // Get product by ID with cache
  static async getRoomById(id: string, skipCache = false) {
    return CacheService.fetchWithCache(
      CacheKeys.room.byId(id),
      async () => {
        return prisma.room.findFirst({
          where: { id },
          include: { images:true,Reviews:true,bookings:true }
        });
      },
      { skipCache }
    );
  }

  // Get product by name with cache
  static async getProductByName(name: string, skipCache = false) {
    return CacheService.fetchWithCache(
      CacheKeys.room.byId(name),
      async () => {
        return prisma.room.findFirst({
          where: { name },
          include: { images:true,Reviews:true,bookings:true }
        });
      },
      { skipCache }
    );
  }

  // Update product and manage cache
  static async updateProduct(id: string, data: any) {
    // Update in database
    const updatedProduct = await prisma.room.update({
      where: { id },
      data,
    });

    // Update product cache
    await CacheService.updateCache(
      CacheKeys.room.byId(id),
      updatedProduct
    );

    // Invalidate related caches
    await CacheService.invalidateCache(CacheKeys.room.all);
    // if (updatedProduct.category) {
    //   await CacheService.invalidateCache(
    //     CacheKeys.products.byCategory(updatedProduct.category.id)
    //   );
    // }

    return updatedProduct;
  }

  // Delete product and clear cache
  static async deleteProduct(id: string) {
    const product = await prisma.room.delete({
      where: { id },
    });

    // Clear related caches
    // await Promise.all([
    //   CacheService.invalidateCache(CacheKeys.products.byId(id)),
    //   CacheService.invalidateCache(CacheKeys.products.all),
    //   product.category && CacheService.invalidateCache(
    //     CacheKeys.products.byCategory(product.category.id)
    //   )
    // ]);

    return product;
  }
}