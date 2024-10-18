import {OrderDto} from "@Api.ts";
import {atom} from "jotai/index";


export const AllOrdersAtom = atom<OrderDto[]>([]);

