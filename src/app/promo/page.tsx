import Image from "next/image";
import { Chip } from "@nextui-org/react";
import { prismaClient } from "@/lib/prisma";
import { BANNER_LINK } from "@/constants/bannerLink";
import { BackButton } from "@/components/common/backButton";
import { TbDiscount } from "react-icons/tb";
import Filter from "@/components/category/slug/filter";

export default async function PromoPage() {

    const deals = await prismaClient.product.findMany({
        where: {
            discountPercentage: {
                gt: 0
            }
        },
        orderBy: {
            id: "asc"
        }
    })

    return (
        <div className="mt-[60px]">
            <Image src={BANNER_LINK.banner_cover_2_mobile} alt="banner_cover_2_mobile" width={0} height={0} sizes="100vw" priority className="block md:hidden h-auto w-full" />
            <Image src={BANNER_LINK.banner_cover_2} alt="banner_cover_2" width={0} height={0} sizes="100vw" priority className="hidden md:block h-auto w-full" />
            <div className="flex items-center justify-start gap-2 p-5">
                <BackButton />
                <Chip
                    startContent={<TbDiscount size={20} />}
                    color="primary"
                    variant="bordered"
                    radius="lg"
                    className="flex items-center justify-center border-2 border-[#1267dc] rounded-xl cursor-default text-black dark:text-white p-2"
                >
                    <span className="font-bold uppercase">Unmissable Offers</span>
                </Chip>
            </div>
            <div className="px-5 w-full mx-auto">
                <Filter products={deals} title="Offers" />
            </div>
        </div>
    )
}