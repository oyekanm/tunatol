export const calculateDiscountedPrice = (price: number, percentage: number) => {
    const discountAmount = (price * percentage) / 100;
    const finalPrice = price - discountAmount;
    
    return {
      originalPrice: price,
      discountPercentage: percentage,
      discountAmount,
      finalPrice
    };
   };