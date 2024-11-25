// lib/redis.ts
import { Redis } from 'ioredis';

// Initialize Redis client
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Cache duration in seconds
const DEFAULT_CACHE_TIME = 3600; // 1 hour
// const EXTENDED_CACHE_TIME = 86400; // 24 hours

interface CacheOptions {
  duration?: number;
  skipCache?: boolean;
}

export default class CacheService {
  // Fetch data with cache
  static async fetchWithCache<T>(
    key: string,
    fetchFn: () => Promise<T>,
    options: CacheOptions = {}
  ): Promise<T> {
    const { duration = DEFAULT_CACHE_TIME, skipCache = false } = options;

    // Skip cache if requested
    if (skipCache) {
      return fetchFn();
    }

    try {
      // Try to get data from cache
      const cachedData = await redis.get(key);
      
      if (cachedData) {
        return JSON.parse(cachedData);
      }

      // If not in cache, fetch from database
      const data = await fetchFn();
      
      // Store in cache
      await redis.setex(key, duration, JSON.stringify(data));
      
      return data;
    } catch (error) {
      console.error('Cache error:', error);
      // Fallback to direct database query on cache error
      return fetchFn();
    }
  }

  // Clear specific cache
  static async invalidateCache(key: string): Promise<void> {
    await redis.del(key);
  }

  // Clear cache by pattern
  static async invalidateCachePattern(pattern: string): Promise<void> {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  }

  // Update cache with new data
  static async updateCache<T>(
    key: string,
    data: T,
    duration: number = DEFAULT_CACHE_TIME
  ): Promise<void> {
    await redis.setex(key, duration, JSON.stringify(data));
  }
}

// // Example API route implementation
// // pages/api/products/index.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { ProductService } from '@/services/productService';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     switch (req.method) {
//       case 'GET':
//         const skipCache = req.query.skipCache === 'true';
//         const products = await ProductService.getAllProducts(skipCache);
//         return res.status(200).json(products);

//       case 'POST':
//         const newProduct = await ProductService.createProduct(req.body);
//         // Cache will be handled inside the service
//         return res.status(201).json(newProduct);

//       default:
//         return res.status(405).json({ message: 'Method not allowed' });
//     }
//   } catch (error) {
//     console.error('API error:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// }