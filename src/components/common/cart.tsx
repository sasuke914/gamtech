import { CartContext } from "@/providers/cart";
import React, { useContext } from "react";
import CartItem from "../cart/cartItem";
import { computeProductTotalPrice } from "@/helpers/product";
import { Button, Link, Tooltip } from "@nextui-org/react";
import { TbCategory2 } from "react-icons/tb";
import { Separator } from "../ui/separator";
import { AiOutlineSafety } from "react-icons/ai";
// import { createCheckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
// import { createOrder } from "@/actions/order";

const Cart = () => {
    const { products, subtotal, total, totalDiscount } = useContext(CartContext);
    const { status, data } = useSession();

    const handleFinishPurchaseClick = async () => {
        if (!data?.user) {
            return
        }

        // const order = await createOrder(products, (data?.user as any).id)

        // const checkout = await createCheckout(products, order.id);

        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

        // stripe?.redirectToCheckout({
        //     sessionId: checkout.id,
        // });
    };

    return (
        <div className="relative">
            <div className="my-5 flex flex-col gap-2 overflow-hidden">
                <div
                    className={`h-full max-h-96 md:max-h-80 ${products.length > 0 && "overflow-y-scroll"
                        } px-2 scrollbar-track-white scrollbar-thumb-[#727272] dark:scrollbar-thumb-[#22222a] md:scrollbar-thin`}
                >
                    {products.length > 0 ? (
                        products.map((product) => (
                            <CartItem
                                key={product.id}
                                product={computeProductTotalPrice(product as any) as any}
                            />
                        ))
                    ) : (
                        <div className="my-5 flex flex-col items-center justify-center text-center">
                            <h4 className="font-semibold">
                                You don't have any products in your cart yet!
                            </h4>
                            <p>How about taking a look at the options?</p>

                            <Link href="/categories" className="mx-auto mt-4 w-full">
                                <Button
                                    endContent={<TbCategory2 size={20} />}
                                    className="w-full font-semibold bg-[#1267dc] text-white text-[14px] flex outline outline-offset-[2px] outline-2 outline-[#1267dc] rounded-[10px] h-[40px]"
                                    variant="shadow"
                                    color="primary"
                                >
                                    View product catalog
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {products.length > 0 && (
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-sm">
                        <p className="font-semibold">Subtotal</p>
                        <p>
                            {subtotal.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                            })}
                        </p>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <p className="font-semibold">Descontos</p>
                        <p className="line-through opacity-80">
                            {totalDiscount.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                            })}
                        </p>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <p className="font-semibold">Frete</p>
                        <p className="uppercase">Free</p>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between text-base">
                        <p className="font-semibold">Total</p>
                        <p className="font-bold text-gamtech">
                            {total.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                            })}
                        </p>
                    </div>

                    <div className="w-full max-w-xl">
                        {status === "authenticated" && data?.user ? (
                            <Button
                                variant="shadow"
                                color="primary"
                                radius="sm"
                                className="w-full font-bold uppercase rounded-lg"
                                endContent={<AiOutlineSafety size={24} />}
                                onClick={handleFinishPurchaseClick}
                            >
                                Checkout
                            </Button>
                        ) : (
                            <Tooltip
                                content={
                                    <p className="cursor-default text-center font-bold px-2">
                                        Oops! You need to log in to add this item to your cart.
                                    </p>
                                }
                                delay={0}
                                closeDelay={0}
                                color="primary"
                                placement="top"
                                className="hidden w-full max-w-xs lg:block rounded-xl"
                            >
                                <div className="w-full cursor-not-allowed">
                                    <Button
                                        variant="shadow"
                                        color="primary"
                                        className="w-full font-bold uppercase rounded-lg opacity-60"
                                        endContent={<AiOutlineSafety size={24} />}
                                        isDisabled
                                    >
                                        Checkout
                                    </Button>
                                    <p className="mt-2 text-center text-sm text-red-500 opacity-80 lg:hidden">
                                        To complete the purchase you must log in.
                                    </p>
                                </div>
                            </Tooltip>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
