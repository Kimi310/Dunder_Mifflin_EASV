import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { orderAtom, orderEntriesAtom } from './state';
export const ShoppingCart= () => {
    
        const [order, setOrder] = useAtom(orderAtom);
        const [orderEntries, setOrderEntries] = useAtom(orderEntriesAtom);
        const [newEntry, setNewEntry] = useState({ productName: '', quantity: 1, price: 0 });

        const addOrderEntry = () => {
            setOrderEntries([...orderEntries, newEntry]);
            setNewEntry({ productName: '', quantity: 1, price: 0 });
        };

        const submitOrder = async () => {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
            });

            if (response.ok) {
                alert('Order created successfully!');
            }
        };

        return (
            <form onSubmit={submitOrder}>
                <input
                    type="text"
                    value={order.customerName}
                    onChange={(e) => setOrder({ ...order, customerName: e.target.value })}
                    placeholder="Customer Name"
                />
                <button type="button" onClick={addOrderEntry}>
                    Add Product
                </button>
                <button type="submit">Submit Order</button>
            </form>
        );
    };

    export default ShoppingCart;
    
   


