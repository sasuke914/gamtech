"use client";

import Image from "next/image"
import { Product } from "@prisma/client"
import { Button } from "@nextui-org/react"
import { useState } from "react"

interface ProductDetailProps {
    product: Pick<Product, "imageUrls" | "name">;
}

export default function ProductImages({ product: { imageUrls, name } }: ProductDetailProps) {
    const [currentImage, setCurrentImage] = useState(imageUrls[0]);

    const handleClick = (imageUrls: string) => {
        setCurrentImage(imageUrls);
    }
    return (
        <div className="flex flex-col w-full">
            <div className="flex h-80 w-full p-4 items-center justify-center bg-white/50 dark:bg-neutral-800">
                <Image src={currentImage} alt="imageUrls" width={0} height={0} sizes="100vw" className="w-full h-full" style={{ objectFit: "contain" }} />
            </div>
            <div className={`flex items-center justify-center gap-3 w-full h-36 ${imageUrls.length === 4 ? 'grid-cols-4' : 'grid-cols-3'}`}>
                {
                    imageUrls.map((imageUrl, index) => (
                        <Button key={index} className={`flex h-20 w-20 sm:w-28 sm:h-28 items-center justify-center rounded-lg bg-white/50 dark:bg-neutral-800 ${imageUrl === currentImage && "border-2 border-black bg-gray-300 dark:border:white dark:bg-neutral-600"
                            }`}
                            onClick={() => handleClick(imageUrl)}>
                            <Image src={imageUrl} alt="imageUrl" width={0} height={0} sizes="100vw" className="w-full h-full" style={{ objectFit: 'contain' }} />
                        </Button>
                    ))
                }
            </div>
        </div>
    )
}