import React, { useState } from 'react';
import { Prodcuts, useGetProducts } from "@modules/products/hooks/useGetProducts";
import { Link } from 'react-router-dom';
import { useCart } from "@modules/cart/components/cartItem"



export const ShoppingCart = () => {
    const { cart, removeFromCart } = useCart();

    

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold">Shopping Cart</h2>
            <div className="my-6">
                {cart.length === 0 ? (
                    <div>Your cart is empty</div>
                ) : (
                    cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center py-4">
                            <div className="text-lg">{item.name} (x{item.quantity})</div>
                            <div className="text-lg">${item.price * item.quantity}</div>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="btn btn-secondary"
                            >
                                Remove
                            </button>
                        </div>
                    ))
                )}
                <div className="text-xl font-bold mt-4">Total: ${totalAmount}</div>
            </div>
            <Link to="/" className="btn btn-primary">Continue Shopping</Link>
        </div>
    );
};
