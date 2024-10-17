import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Zakładam, że masz typy produktów
interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export const ShoppingCart = () => {
    const [cart, setCart] = useState<Product[]>([]);

    // Funkcja dodająca produkt do koszyka
    const addToCart = (product: Product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    // Funkcja usuwająca produkt z koszyka
    const removeFromCart = (productId: number) => {
        setCart(cart.filter(item => item.id !== productId));
    };

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
