import { ProductWithTotalPrice } from "@/helpers/product";
import { Chip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { BsArrowDownShort } from "react-icons/bs";

interface ProductItemProps {
    product: ProductWithTotalPrice;
}

const CategoryProductItem = ({ product }: ProductItemProps) => {
    // Convert base price to a number for calculations
    const basePrice = Number(product.basePrice);
    const totalPrice = product.totalPrice; // Already a number in ProductWithTotalPrice

    // Format prices for display
    const formattedTotalPrice = totalPrice.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
    const formattedBasePrice = basePrice.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });

    return (
        <Link href={`/product/${product.slug}`}>
            <div className="flex transition-all hover:scale-105 flex-col gap-4">
                <div className="relative flex h-40 w-40 w-full items-center justify-center rounded-lg bg-white/80 dark:bg-neutral-800">
                    <Image
                        src={product.imageUrls[0]}
                        alt={product.name}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="h-32 w-auto max-w-[90%]"
                        style={{ objectFit: "contain" }}
                    />
                    {product.discountPercentage > 0 && (
                        <Chip
                            className="absolute left-2 top-2 flex bg-[#D4D4D8] p-1 pr-2 dark:bg-[#3F3F46]"
                            variant="solid"
                            size="sm"
                            startContent={<BsArrowDownShort size={20} />}
                        >
                            <p className="text-tiny">{product.discountPercentage}%</p>
                        </Chip>
                    )}
                </div>
                <div className="flex flex-col gap-1 md:text-center">
                    <p className="overflow-hidden text-ellipsis whitespace-nowrap text-tiny">
                        {product.name}
                    </p>
                    <div className="flex items-center justify-center gap-2">
                        {product.discountPercentage > 0 ? (
                            <>
                                <p className="text-xs font-extrabold text-[#1267dc]">
                                    {formattedTotalPrice}
                                </p>
                                <p className="text-xs line-through opacity-75">
                                    {formattedBasePrice}
                                </p>
                            </>
                        ) : (
                            <p className="text-xs font-extrabold text-[#1267dc]">
                                {formattedBasePrice}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CategoryProductItem;
