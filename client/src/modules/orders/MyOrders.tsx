import { useAtom } from 'jotai';
import { AllOrdersAtom } from '@atoms/AllOrdersAtom.ts';
import { useEffect, useState } from 'react';
import { OrderDto } from '@Api.ts';
import { localUser } from '@hooks/authentication/Authentication.tsx';
import { Customer } from '@assets/models/Customer.tsx';

export const MyOrders = () => {
    const [orders] = useAtom(AllOrdersAtom);  // Get all orders
    const [filteredOrders, setFilteredOrders] = useState<OrderDto[]>([]);  // State to store filtered orders

    useEffect(() => {
        if (localUser != null) {
            try {
                // Parse localUser into Customer
                const customer: Customer = JSON.parse(localUser) as Customer;

                // Filter orders where customerId matches the current user
                const customerOrders = orders.filter(order => order.customerId === customer.id);

                // Update the state with filtered orders
                setFilteredOrders(customerOrders);
            } catch (error) {
                console.error('Failed to parse localUser or filter orders:', error);
            }
        }
    }, [orders]);  // Rerun the effect when orders change

    // Handle case where no orders or localUser is null
    if (!localUser) return <div>Please log in to see your orders.</div>;
    if (filteredOrders.length === 0) return <div>No orders found for this customer.</div>;

    return (
        <div className="flex flex-col w-full items-center p-5">
            <h1 className="font-bold text-4xl">Your Orders</h1>
            {filteredOrders.map(o => (
                <div key={o.customerId} className="flex flex-row mt-5">
                    <div className="mr-5">Customer ID: {o.customerId}</div>
                    <div>Total amount: {o.totalAmount}</div>
                    <div>Status: {o.status}</div>
                </div>
            ))}
        </div>
    );
};
