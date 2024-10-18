import React, { useState } from 'react';
import { Prodcuts, useGetProducts } from "@modules/products/hooks/useGetProducts";
import { Link } from 'react-router-dom';
import { useCart } from "@modules/cart/components/cartItem"
import {Api, OrderDto} from "@Api.ts";
import {localUser, useAuth} from "@hooks/authentication/Authentication.tsx";
import {Customer} from "@assets/models/Customer.tsx";
import {toast} from "react-hot-toast";
import {AllOrdersAtom} from "@atoms/AllOrdersAtom.ts";
import {useAtom} from "jotai/index";



export const ShoppingCart = () => {
    const { cart, removeFromCart } = useCart();
    const [ allOrders,setAllOrders ] = useAtom(AllOrdersAtom);
    // @ts-ignore
    const totalAmount = cart.reduce((sum, item) => sum + item.product?.price * item.quantity, 0);

    function placeAnOrder(){
        if (localUser != null){
            //@ts-ignore
            const customer: Customer = JSON.parse(localUser) as Customer;
            let order : OrderDto = {
                customerId: customer.id,
                orderEntries: {...cart},
                totalAmount: totalAmount
            }
            new Api().order.orderCreateOrder(order).then(res => {
                setAllOrders(prev => [...prev,res.data]);
            })
        }else {
            toast.error("You are not logged in");
        }
    }


    return (
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold">Shopping Cart</h2>
            <div className="my-6">
                {cart.length === 0 ? (
                    <div>Your cart is empty</div>
                ) : (
                    cart.map((item) => (
                        <div key={item.productId} className="flex justify-between items-center py-4">
                            <div className="text-lg">{item.product?.name} (x{item.quantity})</div>
                            <div className="text-lg">${
                                // @ts-ignore
                                item.product?.price * item.quantity
                            }</div>
                            <button
                                onClick={
                                //@ts-ignore
                                () => removeFromCart(item.productId)
                            }
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
            <button onClick={()=>placeAnOrder()} className="btn btn-primary">Buy</button>
        </div>
    );
};
