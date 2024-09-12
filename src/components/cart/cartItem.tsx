import { CartContext, CartProduct } from "@/providers/cart";
import React, { useContext } from "react";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Button } from "@nextui-org/react";
import { BiSolidChevronLeft, BiSolidChevronRight } from "react-icons/bi";
import { HiTrash } from "react-icons/hi";

interface CardItemProps {
  product: CartProduct;
}

const CartItem = ({ product }: CardItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseProductQuantityClick = () => {
    decreaseProductQuantity(product.id);
  };

  const handleIncreaseProductQuantityClick = () => {
    increaseProductQuantity(product.id);
  };

  const handleRemoveProductClick = () => {
    removeProductFromCart(product.id);
  };

  // Convert and calculate prices
  const basePrice = Number(product.basePrice); // Convert Decimal to number
  const totalPrice = Number(product.totalPrice); // Already converted in previous logic
  const formattedTotalPrice = (totalPrice * product.quantity).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const formattedBasePrice = (basePrice * product.quantity).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      <div className="flex w-full items-center justify-center gap-3">
        <div className="flex aspect-square h-auto w-1/3 items-center justify-center rounded-lg bg-white/50 dark:bg-neutral-800">
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            width={0}
            height={0}
            sizes="100vw"
            className="h-full w-full p-3"
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="flex w-2/3 flex-col">
          <h2 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {product.name}
          </h2>

          <div className="flex items-center justify-center gap-2 text-center">
            {product.discountPercentage > 0 ? (
              <>
                <p className="text-base font-extrabold text-gamtech">
                  {formattedTotalPrice}
                </p>
                <p className="text-tiny line-through opacity-75">
                  {formattedBasePrice}
                </p>
              </>
            ) : (
              <p className="text-base font-extrabold text-gamtech">
                {formattedBasePrice}
              </p>
            )}
          </div>

          <div className="my-2 lg:my-4 flex items-center justify-around">
            <div className="flex items-center justify-center">
              <Button
                isIconOnly
                variant="shadow"
                color="primary"
                startContent={<BiSolidChevronLeft size={20} />}
                size="md"
                onClick={handleDecreaseProductQuantityClick}
                className="rounded-xl"
              />
              <span className="px-4">{product.quantity}</span>
              <Button
                isIconOnly
                variant="shadow"
                color="primary"
                startContent={<BiSolidChevronRight size={20} />}
                size="md"
                onClick={handleIncreaseProductQuantityClick}
                className="rounded-xl"
              />
            </div>

            <Button
              variant="flat"
              endContent={<HiTrash size={20} />}
              size="md"
              onClick={handleRemoveProductClick}
              isIconOnly
              className="rounded-xl bg-neutral-300 rounded-xl dark:bg-neutral-800"
            />
          </div>
        </div>
      </div>
      <Separator className="mb-2 mt-4" />
    </div>
  );
};

export default CartItem;
