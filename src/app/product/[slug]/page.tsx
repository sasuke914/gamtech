import CategoryProductItem from "@/components/categories/categoryProductItem";
import ProductList from "@/components/home/productList";
import ProductImages from "@/components/productDetail/productImages";
import ProductInfo from "@/components/productDetail/productInfo";
import { Separator } from "@/components/ui/separator";
import { BANNER_LINK } from "@/constants/bannerLink";
import { computeProductTotalPrice } from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";
import Image from "next/image";

interface ProductDetailsProps {
    params: {
        slug: string;
    };
}



export default async function ProductDetail({ params: { slug } }: ProductDetailsProps) {
    const product = await prismaClient.product.findFirst({
        where: {
            slug: slug,
        },
        include: {
            category: {
                include: {
                    products: {
                        where: {
                            slug: {
                                not: slug,
                            },
                        },
                    },
                },
            },
        },
    });

    if (!product) return null;


    return (
        <div className="mt-[60px] pb-5">
            <div className="flex flex-col w-full lg:flex-row pb-2">
                <div className="w-full">
                    <ProductImages product={product} />
                </div>
                <div className="w-full">
                    <ProductInfo product={computeProductTotalPrice(product)} />
                </div>
            </div>
            <Separator className="mx-auto my-4 w-full max-w-[95vw]" />
            <div className="lg:hidden">
                <ProductList products={product.category.products} />
            </div>
            <div className="hidden lg:block">
                <div className="grid grid-cols-2 gap-4 px-5 pb-8 pt-3 md:grid-cols-5">
                    {product.category.products.map((product) => (
                        <CategoryProductItem
                            key={product.id}
                            product={computeProductTotalPrice(product)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}