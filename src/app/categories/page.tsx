import Image from "next/image";
import { Chip } from "@nextui-org/react";
import { prismaClient } from "@/lib/prisma";
import { BANNER_LINK } from "@/constants/bannerLink";
import { BackButton } from "@/components/common/backButton";
import { TbCategory2 } from "react-icons/tb";
import { CategoryItem } from "@/components/categories/categoryItem";

export default async function Categories() {
    const categories = await prismaClient.category.findMany({})
    return (
        <div className="mt-[60px]">
            <Image
                src={BANNER_LINK.banner_cover_2_mobile}
                alt="banner_cover_2_mobile"
                width={0}
                height={0}
                sizes="100vw"
                priority
                className="block md:hidden h-auto w-full"
            />
            <Image
                src={BANNER_LINK.banner_cover_2}
                alt="banner_cover_2"
                width={0}
                height={0}
                sizes="100vw"
                priority
                className="hidden md:block h-auto w-full"
            />
            <div className="flex items-center justify-left p-5 gap-2">
                <BackButton />
                <Chip
                    startContent={<TbCategory2 size={20} />}
                    color="primary"
                    variant="bordered"
                    radius="lg"
                    className="flex items-center justify-center border-2 border-[#1267dc] rounded-xl cursor-default text-black dark:text-white p-2"
                >
                    <span className="font-bold uppercase">Categories</span>
                </Chip>
            </div>
            <div className="pt-3 px-5 pb-8 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                {categories.map((category, index) => (
                    <CategoryItem key={index} category={category} />
                ))}
            </div>
        </div>
    )
}