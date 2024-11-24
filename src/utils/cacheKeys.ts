 const CacheKeys = {
  room: {
    all: 'products:all',
    byId: (id: string) => `products:${id}`,
    byCategory: (category: string) => `products:category:${category}`,
    featured: 'products:featured',
  },
  users: {
    byId: (id: string) => `users:${id}`,
    preferences: (id: string) => `users:${id}:preferences`,
  },
  // Add more cache key patterns as needed
};

export default CacheKeys