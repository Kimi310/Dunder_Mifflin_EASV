import {useAtom} from "jotai/index";
import {AllOrdersAtom} from "@atoms/AllOrdersAtom.ts";
import {useEffect} from "react";
import {Api, OrderDto} from "@Api.ts";

export const Orders = ()=>{
    const [orders,setOrders] = useAtom(AllOrdersAtom);

    function changeOrderStatus(o: OrderDto, status:string){
        o.status = status;
        new Api().order.orderChangeOrderStatus(o).then(r => {
            const updatedOrder = r.data;
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === updatedOrder.id ? updatedOrder : order
                )
            );
        });
    }


    return <div className="flex flex-col w-full items-center p-5">
        <h1 className="font-bold text-4xl">All orders</h1>
        {orders.map(o => (
            <div className="flex flex-row mt-5 items-center justify-center">
                <div className="mr-5"> Order id: {o.id}</div>
                <div className="mr-5">Customer id: {o.customerId}</div>
                <div className="mr-5">Total amount: {o.totalAmount}</div>
                    <label className="mr-5">Status: {o.status}</label>
                    <button onClick={()=> changeOrderStatus(o,"Pending")} className="btn btn-primary mr-5">Change status to "Pending"</button>
                    <button onClick={()=> changeOrderStatus(o,"In progress")} className="btn btn-primary mr-5">Change status to "In progress"</button>
                    <button onClick={()=> changeOrderStatus(o,"Delivered")} className="btn btn-primary">Change status to "Delivered"</button>
            </div>
        ))}
    </div>
}