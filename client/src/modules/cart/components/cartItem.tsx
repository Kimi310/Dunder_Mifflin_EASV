import React, { createContext, useContext, useState } from 'react';
import {OrderEntryDto} from "@Api.ts";
import {OrderEntry} from "@assets/models/OrderEntry.ts";
import {Paper} from "@assets/models/Paper.ts";
import {Prodcuts} from "@modules/products/hooks/useGetProducts.ts";

interface CartContextType {
    cart: OrderEntry[];  // cart is an array of OrderEntryDto
    addToCart: (product: Prodcuts) => void;  // Function to add a product
    removeFromCart: (productId: number) => void;  // Function to remove product by id
}

const CartContext = createContext<CartContextType>({
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
});

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState<OrderEntry[]>([]);

    const addToCart = (product : Prodcuts) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.productId === product.id);
            if (existingProduct) {

                return prevCart.map(item =>
                    item.productId === product.id
                        // @ts-ignore
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                let orderEntry: OrderEntry = {
                    productId: product.id,
                    product: product,
                    quantity: 1
                }
                return [...prevCart,orderEntry];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.productId !== productId));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};