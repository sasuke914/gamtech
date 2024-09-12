import { BANNER_LINK } from "@/constants/bannerLink"
import { prismaClient } from "@/lib/prisma"
import Image from "next/image"
import ProductList from "./productList"
import { DesktopBannerSection } from "./desktopBannerSection"
import { ProductListSection } from "./productListSection"
import { BannerSection } from "./bannerSection"

export default async function MobileUI() {

    async function fetchProductsByCategories(categorySlugs: string[]) {
        return await prismaClient.product.findMany({
            where: {
                category: {
                    slug: {
                        in: categorySlugs,
                    }
                }
            },
            orderBy: {
                id: "asc"
            }
        })
    }

    async function fetchProductsByDiscount() {
        return await prismaClient.product.findMany({
            where: {
                discountPercentage: {
                    gt: 0
                }
            },
            orderBy: {
                id: "desc"
            }
        })
    }

    const deal = await fetchProductsByDiscount();

    const mouses = await fetchProductsByCategories(["mouses"]);
    const keyboards = await fetchProductsByCategories(["keyboards"]);
    const cpus = await fetchProductsByCategories(["cpu"]);
    const motherboard = await fetchProductsByCategories(["motherboards"]);
    const gpu = await fetchProductsByCategories(["gpu"]);
    const headsets = await fetchProductsByCategories(["headsets"]);

    return (
        <main className="bloc md:hidden mt-[60px]">
            <div>
                <Image src={BANNER_LINK.banner_cover} alt="banner_cover" width={0} height={0} sizes="100vw" priority className="h-96 w-full object-cover" />
                <div className="mx-auto mt-4 w-full max-w-xl px-5">

                </div>
                <section className="my-5">
                    <h2 className="mb-2 pl-5 text-lg font-semibold">Offers</h2>
                    <ProductList products={deal} />
                </section>
                <BannerSection imageSrc={BANNER_LINK.banner_mouses} altText="banner_mouses" />
                <ProductListSection title="Mouses" products={mouses} />
                <BannerSection imageSrc={BANNER_LINK.banner_keyboards} altText="banner_keyboards" />
                <ProductListSection title="Keyboards" products={keyboards} />
                <BannerSection imageSrc={BANNER_LINK.banner_headphones} altText="banner_headphones" />
                <ProductListSection title="Headsets" products={headsets} />
                <BannerSection imageSrc={BANNER_LINK.banner_gpu} altText="banner_gpu" />
                <ProductListSection title="Video Cards" products={gpu} />
                <BannerSection imageSrc={BANNER_LINK.banner_cpu} altText="banner_cpu" />
                <ProductListSection title="Processors" products={cpus} />
                <BannerSection imageSrc={BANNER_LINK.banner_motherboard} altText="banner_motherboard" />
                <ProductListSection title="Motherboards" products={motherboard} />
                <Image src={BANNER_LINK.banner_fretemobile} alt="banner_fretemobile" width={0} height={0} className="h-auto w-full object-cover md:block mt-3" sizes="100vw" priority />
            </div>
        </main>
    )
}