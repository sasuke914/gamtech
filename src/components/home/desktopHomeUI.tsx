import { BANNER_LINK } from "@/constants/bannerLink"
import { prismaClient } from "@/lib/prisma";
import Image from "next/image";
import ProductList from "./productList";
import { DesktopBannerSection } from "./desktopBannerSection";

export default async function DesktopUI() {

    const mouseAndkeyboardsBanner = [
        {
            src: BANNER_LINK.banner_keyboards,
            alt: "keyboard",
        },
        {
            src: BANNER_LINK.banner_mouses,
            alt: "mouse",
        }
    ];

    const headsetsAndGpuBanner = [
        {
            src: BANNER_LINK.banner_headphones,
            alt: "headphone",
        },
        {
            src: BANNER_LINK.banner_gpu,
            alt: "gpu"
        }
    ];

    const cpuAndMotherboardsBanner = [
        {
            src: BANNER_LINK.banner_cpu,
            alt: "cpu"
        },
        {
            src: BANNER_LINK.banner_motherboard,
            alt: "motherboard"
        }
    ];

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
                id: "asc",
            }
        })
    }

    async function fetchProductsByDiscount() {
        return await prismaClient.product.findMany({
            where: {
                discountPercentage: {
                    gt: 0,
                }
            },
            orderBy: {
                id: "desc"
            }
        })
    }

    const deals = await fetchProductsByDiscount();

    const mousesAndKeyboards = await fetchProductsByCategories([
        "keyboards",
        "mouses",
    ]);
    const headsetsAndGpu = await fetchProductsByCategories([
        "gpu", "headsets"
    ]);
    const cpuAndMotherboards = await fetchProductsByCategories([
        "cpu",
        "motherboards",
    ]);
    return (
        <main className="hidden md:block mt-[60px]">
            <div>
                <Image src={BANNER_LINK.banner_cover} alt="banner_cover" width={0} height={0} className="hidden h-96 w-full object-cover md:block" sizes="100vw" priority />
                <div className="mx-auto mt-4 w-full max-w-xl px-5">

                </div>
                <section className="my-5">
                    <div className="mb-5 flex flex-col items-center justify-center px-5 text-center">
                        <h1 className="text-2xl font-semibold">Check out the offers</h1>
                        <p>Here are the amazing offers we have for you. Don't miss out!</p>
                    </div>
                    <ProductList products={deals} />
                </section>
                <DesktopBannerSection images={cpuAndMotherboardsBanner} />
                <section className="my-5">
                    <div className="mb-5 flex flex-col items-center justify-center px-5 text-center">
                        <p>Get the most out of your machine.</p>
                    </div>
                    <ProductList products={cpuAndMotherboards} />
                </section>
                <DesktopBannerSection images={mouseAndkeyboardsBanner} />
                <section className="my-5">
                    <div className="mb-5 flex flex-col items-center justify-center px-5 text-center">
                        <p>Enhance your digital journey with the best peripherals.</p>
                    </div>
                    <ProductList products={mousesAndKeyboards} />
                </section>
                <DesktopBannerSection images={headsetsAndGpuBanner} />
                <section className="my-5">
                    <div className="mb-5 flex flex-col items-center justify-center px-5 text-center">
                        <p>Find the ideal combination for the best viewing experience.</p>
                    </div>
                    <ProductList products={headsetsAndGpu} />
                </section>
                <Image src={BANNER_LINK.banner_fretegratis} alt="banner_fretegratis" width={0} height={0} className="hidden h-auto w-full object-cover md:block mt-5" sizes="100vw" priority />
            </div>
        </main>
    )
}