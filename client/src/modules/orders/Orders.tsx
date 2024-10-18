import {useAtom} from "jotai/index";
import {AllOrdersAtom} from "@atoms/AllOrdersAtom.ts";

export const Orders = ()=>{
    const [orders,setOrders] = useAtom(AllOrdersAtom);

    return <div className="flex flex-col w-full items-center p-5">
        <h1 className="font-bold text-4xl">All orders</h1>
        {orders.map(o => (
            <div className="flex flex-row mt-5">
                <div className="mr-5">Customer id: {o.customerId}</div>
                <div>Total amount: {o.totalAmount}</div>
                <div>Status: {o.status}</div>
            </div>
        ))}
    </div>
}