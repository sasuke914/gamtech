"use client";

import { ProductWithTotalPrice } from "@/helpers/product";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
  total: number;
  subtotal: number;
  totalDiscount: number;
  numTotalItems: number;
  AddProductsToCart: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  cartTotalPrice: 0,
  total: 0,
  subtotal: 0,
  totalDiscount: 0,
  numTotalItems: 0,
  AddProductsToCart: () => { },
  decreaseProductQuantity: () => { },
  increaseProductQuantity: () => { },
  removeProductFromCart: () => { },
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useLocalStorage<CartProduct[]>("@gamtech/cart-products", []);
  const [uniqueProductIds, setUniqueProductIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("@gamtech/cart-products") || "[]");
    setProducts(savedProducts);
  }, [setProducts]);

  useEffect(() => {
    setUniqueProductIds(new Set(products.map((product) => product.id)));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("@gamtech/cart-products", JSON.stringify(products));
  }, [products]);

  const subtotal = useMemo(() => {
    return products.reduce((acc, product) => acc + Number(product.basePrice) * product.quantity, 0);
  }, [products]);

  const total = useMemo(() => {
    return products.reduce((acc, product) => acc + product.totalPrice * product.quantity, 0);
  }, [products]);

  const totalDiscount = useMemo(() => subtotal - total, [total, subtotal]);

  const AddProductsToCart = (product: CartProduct) => {
    const productExists = products.find((p) => p.id === product.id);

    if (productExists) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + product.quantity } : p
        )
      );
    } else {
      setUniqueProductIds((prevIds) => new Set([...prevIds, product.id]));
      setProducts((prev) => [...prev, product]);
    }

    toast.success(`Produto adicionado ao carrinho!`, {
      style: { fontSize: "0.8rem" },
      duration: 700,
    });
  };

  const numTotalItems = uniqueProductIds.size;

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prev) => {
      const newProducts = prev
        .map((p) => {
          if (p.id === productId) {
            const newQuantity = p.quantity - 1;
            if (newQuantity === 0) {
              setUniqueProductIds((prevIds) => {
                const newIds = new Set(prevIds);
                newIds.delete(productId);
                return newIds;
              });
            }
            return { ...p, quantity: newQuantity };
          }
          return p;
        })
        .filter((p) => p.quantity > 0);

      return newProducts;
    });

    toast.success(`Produto removido do carrinho!`, {
      style: { fontSize: "0.8rem" },
      duration: 700,
    });
  };

  const increaseProductQuantity = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  const removeProductFromCart = (productId: string) => {
    toast.success(`Produto removido!`, {
      style: { fontSize: "0.7rem" },
    });

    setProducts((prev) => {
      const newProducts = prev.filter((p) => p.id !== productId);
      setUniqueProductIds((prevIds) => {
        const newIds = new Set(prevIds);
        newIds.delete(productId);
        return newIds;
      });
      return newProducts;
    });
  };

  return (
    <CartContext.Provider
      value={{
        products,
        AddProductsToCart,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
        cartTotalPrice: 0,
        total,
        subtotal,
        totalDiscount,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
        numTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
