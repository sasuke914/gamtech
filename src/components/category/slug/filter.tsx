"use client";

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { computeProductTotalPrice } from "@/helpers/product";
import { Category, Product } from "@prisma/client";
import { ChevronDown } from "lucide-react";
import { BsSortUp, BsSortDown, BsPercent } from "react-icons/bs";
import { TiSortAlphabetically } from "react-icons/ti";
import { useState, useEffect } from "react";
import CategoryProductItem from "@/components/categories/categoryProductItem";

interface FilterProps {
    category?: Category;
    products: Product[];
    title?: string;
}

export default function Filter({ category, products, title }: FilterProps) {
    const [filterProducts, setFilterProducts] = useState<Product[]>([]);

    useEffect(() => {
        setFilterProducts(products);
    }, [products]);

    const filterAscending = () => {
        const sortedProducts = [...filterProducts].sort((a, b) => Number(a.basePrice) - Number(b.basePrice));
        setFilterProducts(sortedProducts);
    };

    const filterDescending = () => {
        const sortedProducts = [...filterProducts].sort((a, b) => Number(b.basePrice) - Number(a.basePrice));
        setFilterProducts(sortedProducts);
    };

    const filterDiscount = () => {
        const sortedProducts = [...filterProducts].sort((a, b) => Number(b.discountPercentage) - Number(a.discountPercentage));
        setFilterProducts(sortedProducts);
    };

    const filterName = () => {
        const sortedProducts = [...filterProducts].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
        setFilterProducts(sortedProducts);
    };

    return (
        <div className="w-full">
            <div className="flex w-full p-2 items-center justify-between bg-white/80 rounded-xl dark:bg-neutral-800">
                <p className="font-medium text-center ml-2 md:ml-5">
                    {products.length} {category?.name} {title} available
                </p>
                <Dropdown className="bg-black rounded-xl">
                    <DropdownTrigger>
                        <Button variant="bordered" className="flex" endContent={<ChevronDown size={20} />}>
                            Filter By
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu variant="faded">
                        <DropdownItem
                            key="ascending-price"
                            endContent={<BsSortUp size={20} />}
                            onClick={filterAscending}
                            className="flex"
                        >
                            Increasing Price
                        </DropdownItem>
                        <DropdownItem
                            key="descending-price"
                            endContent={<BsSortDown size={20} />}
                            onClick={filterDescending}
                            className="flex"
                        >
                            Decreasing Price
                        </DropdownItem>
                        <DropdownItem
                            key="discount"
                            endContent={<BsPercent size={20} />}
                            onClick={filterDiscount}
                            className="flex"
                        >
                            Discount
                        </DropdownItem>
                        <DropdownItem
                            key="alphabetical"
                            endContent={<TiSortAlphabetically size={20} />}
                            onClick={filterName}
                            className="flex"
                        >
                            Alphabetical Order
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 pb-8 md:grid-cols-3 xl:grid-cols-6">
                {filterProducts.map((product) => (
                    <CategoryProductItem key={product.id} product={computeProductTotalPrice(product)} />
                ))}
            </div>
        </div>
    );
}
