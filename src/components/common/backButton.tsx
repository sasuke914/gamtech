"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { TbArrowBack } from "react-icons/tb";

export const BackButton = () => {
    const router = useRouter();
    return (
        <Button
            startContent={<TbArrowBack size={20} />}
            className="flex bg-[#1267db] transition-all p-[10px] text-white rounded-xl hover:scale-[1.02]"
            color="primary"
            variant="solid"
            isIconOnly size="md"
            onClick={() => router.back()}
        />
    )
}