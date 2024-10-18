import { atom } from 'jotai';
import { Api, OrderDto } from '@Api.ts';
import {useAtom} from "jotai/index";

export const AllOrdersAtom = atom<OrderDto[]>([]);


export async function initAllOrdersAtom() {
    const [orders,setOrders] = useAtom(AllOrdersAtom);
    try {
        const response = await new Api().order.orderGetOrders();
        setOrders(response.data);
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];  // Return an empty array if there's an error
    }
}