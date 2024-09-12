import { Product } from "@prisma/client";

export interface ProductWithTotalPrice extends Product {
  totalPrice: number;
}

export const computeProductTotalPrice = (
  product: Product,
): ProductWithTotalPrice => {
  // Convert basePrice to a number for calculations
  const basePrice = Number(product.basePrice);  // Convert Decimal to number
  const discountPercentage = product.discountPercentage; // discountPercentage is already an Int

  // Calculate total price considering discount
  const totalPrice =
    discountPercentage === 0
      ? basePrice
      : basePrice - basePrice * (discountPercentage / 100);

  return {
    ...product,
    totalPrice,
  };
};
