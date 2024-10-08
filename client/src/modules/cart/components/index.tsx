import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { orderAtom, orderEntriesAtom } from './state';
export const ShoppingCart= () =>{
        const [customerId, setCustomerId] = useState('');
        const [orderEntries, setOrderEntries] = useState([{ productId: '', quantity: '' }]);

        const handleAddEntry = () => {
            setOrderEntries([...orderEntries, { productId: '', quantity: '' }]);
        };

        const handleSubmit = async (e) => {
            e.preventDefault();

            const orderData = {
                customerId,
                orderEntries
            };

            try {
                const response = await fetch('/api/order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData),
                });

                if (response.ok) {
                    const result = await response.json();
                    alert('Order created successfully');
                } else {
                    alert('Failed to create order');
                }
            } catch (error) {
                console.error('Error creating order:', error);
            }
        };

        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Customer ID:</label>
                    <input type="text" value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
                </div>

                {orderEntries.map((entry, index) => (
                    <div key={index}>
                        <label>Product ID:</label>
                        <input
                            type="text"
                            value={entry.productId}
                            onChange={(e) => {
                                const newEntries = [...orderEntries];
                                newEntries[index].productId = e.target.value;
                                setOrderEntries(newEntries);
                            }}
                        />
                        <label>Quantity:</label>
                        <input
                            type="text"
                            value={entry.quantity}
                            onChange={(e) => {
                                const newEntries = [...orderEntries];
                                newEntries[index].quantity = e.target.value;
                                setOrderEntries(newEntries);
                            }}
                        />
                    </div>
                ))}

                <button type="button" onClick={handleAddEntry}>Add Product</button>
                <button type="submit">Create Order</button>
            </form>
        );
    }

    export default ShoppingCart;