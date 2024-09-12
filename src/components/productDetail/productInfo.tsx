"use client";

import { ProductWithTotalPrice } from "@/helpers/product";
import { Button, Chip, Tooltip } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import React, { useContext, useState } from "react";
import { BsArrowDownShort } from "react-icons/bs";
import { BiSolidChevronRight, BiSolidChevronLeft } from "react-icons/bi";
import { HiShoppingCart } from "react-icons/hi";
import { FaTruckFast } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { CartContext } from "@/providers/cart";

interface ProductInfoProps {
    product: ProductWithTotalPrice;
}

export default function ProductInfo({ product }: ProductInfoProps) {
    const [quantity, setQuantity] = useState(1);
    const { status, data } = useSession();
    const { AddProductsToCart } = useContext(CartContext);

    const handleDecreaseQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
    };

    const handleIncreaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleAddToCartClick = () => {
        AddProductsToCart({ ...product, quantity });
    };

    return (
        <div className="flex flex-col items-center p-5 bg-white/50 dark:bg-neutral-800 w-full rounded-bl-2xl">
            <h2 className="text-center text-lg font-semibold">{product.name}</h2>
            <div className="flex gap-2 my-2 items-center justify-center">
                {product.discountPercentage > 0 && (
                    <Chip
                        className="flex bg-[#D4D4D8] p-1 pr-2 dark:bg-[#3F3F46]"
                        variant="solid"
                        size="sm"
                        startContent={<BsArrowDownShort size={20} />}
                    >
                        <p className="text-tiny">{product.discountPercentage}%</p>
                    </Chip>
                )}
                {product.discountPercentage > 0 ? (
                    <>
                        <p className="text-xl font-extrabold text-[#1267dc]">
                            {product.totalPrice.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                            })}
                        </p>
                        <p className="text-xl line-through opacity-75">
                            {Number(product.basePrice).toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                            })}
                        </p>
                    </>
                ) : (
                    <p className="text-xl font-extrabold text-[#1267dc]">
                        {Number(product.basePrice).toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                        })}
                    </p>
                )}
            </div>
            <div className="flex flex-col items-center my-4 gap-4 w-full">
                <div className="flex items-center justify-center w-full">
                    <Button
                        isIconOnly
                        variant="shadow"
                        color="primary"
                        className="rounded-lg bg-[#1267dc] p-[6px]"
                        startContent={<BiSolidChevronLeft size={20} />}
                        size="sm"
                        onClick={handleDecreaseQuantity}
                    />
                    <span className="px-4 font-semibold">{quantity}</span>
                    <Button
                        isIconOnly
                        variant="shadow"
                        color="primary"
                        className="rounded-lg bg-[#1267dc] p-[6px]"
                        startContent={<BiSolidChevronRight size={20} />}
                        size="sm"
                        onClick={handleIncreaseQuantity}
                    />
                </div>
                <div className="w-full max-w-xl">
                    {status === "authenticated" && data?.user ? (
                        <Button
                            variant="shadow"
                            color="primary"
                            className="rounded-xl bg-[#1267dc] w-full flex h-[40px] font-bold"
                            endContent={<HiShoppingCart size={20} />}
                            onClick={handleAddToCartClick}
                        >
                            Add to Cart
                        </Button>
                    ) : (
                        <Tooltip
                            content={<p className="cursor-default text-center font-bold">Oops! You need to log in to add this item to your cart.</p>}
                            delay={0}
                            closeDelay={0}
                            color="primary"
                            placement="bottom"
                            radius="sm"
                            className="w-full max-w-xs hidden lg:block bg-[#1267dc] rounded-lg px-3 py-1 text-sm"
                        >
                            <div className="w-full cursor-not-allowed">
                                <Button
                                    variant="shadow"
                                    color="primary"
                                    className="rounded-xl bg-[#1267dc] w-full flex h-[40px] font-bold opacity-50"
                                    disabled
                                    endContent={<HiShoppingCart size={20} />}
                                >
                                    Add to Cart
                                </Button>
                                <p className="text-red-500 opacity-80 text-sm text-center mt-2 lg:hidden">
                                    Para adicionar este item ao carrinho é necessário fazer login
                                </p>
                            </div>
                        </Tooltip>
                    )}
                </div>
            </div>
            <div className="mt-2 flex flex-col gap-4 w-full">
                <div className="flex items-center justify-between py-3 px-5 w-full bg-white/50 dark:bg-neutral-900 rounded-xl">
                    <div className="flex gap-2">
                        <FaTruckFast size={40} />
                        <div className="text-sm">
                            <p>Delivery via <span className="font-bold">Gampack</span> &reg;</p>
                            <p className="text-[#1267dc]">Shipping throughout Brazil</p>
                        </div>
                    </div>
                    <div className="text-sm font-bold">
                        <p>Free shipping</p>
                    </div>
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <Accordion
                        variant="shadow"
                        className="bg-white/50 dark:bg-neutral-900 w-full"
                        style={{ borderRadius: '12px' }}
                    >
                        <AccordionItem
                            key="1"
                            aria-label="About the product"
                            title={<h1 className="ml-2 font-semibold w-full">About the product</h1>}
                            subtitle={
                                <p className="ml-2 text-tiny opacity-80">
                                    Click to see more detail
                                </p>
                            }
                        >
                            <p className="px-2 pb-4 text-justify opacity-80">
                                {product.description.replace(/\\n/g, "\n")}
                            </p>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
