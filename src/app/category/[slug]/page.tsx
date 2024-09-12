import Filter from "@/components/category/slug/filter";
import { BackButton } from "@/components/common/backButton";
import { CATEGORY_ICON } from "@/constants/categoryIcon";
import { prismaClient } from "@/lib/prisma";
import { Chip } from "@nextui-org/react";

export default async function ({ params }: any) {
    const category = await prismaClient.category.findFirst({
        where: {
            slug: params.slug,
        },
        include: {
            products: true
        }
    })
    if (!category) {
        return null;
    }
    return (
        <div className="p-5 mt-[60px]">
            <div className="flex items-center justify-left gap-2">
                <BackButton />
                <Chip
                    startContent={CATEGORY_ICON[params.slug as keyof typeof CATEGORY_ICON]}
                    color="primary"
                    variant="bordered"
                    radius="lg"
                    className="flex items-center justify-center border-2 border-[#1267dc] rounded-xl cursor-default text-black dark:text-white p-2"
                >
                    <span className="font-bold uppercase">{category.slug}</span>
                </Chip>
            </div>
            <div className="mt-5">
                <Filter category={category} products={category.products} />
            </div>
        </div>
    )
}