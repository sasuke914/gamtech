import { Category } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

interface CategoryItemProps {
    category: Category
}

export const CategoryItem = ({ category }: CategoryItemProps) => {
    return (
        <Link href={`/category/${category.slug}`} className="group flex items-center justify-center flex-col w-full text-sm text-center font-semibold rounded-xl bg-white/80 dark:bg-neutral-800 hover:opacity-90">
            <div className="p-5">
                <Image src={category.imageUrl} alt={category.imageUrl} width={0} height={0} sizes="100vw" priority className="w-full h-24 m-auto" />
            </div>
            <div className="p-3">
                <span className="group-hover:text-gamtech">
                    {category.slug}
                </span>
            </div>
        </Link>
    )
}