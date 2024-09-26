import { useQuery } from "@tanstack/react-query"

import { Api } from "@Api"
export type Prodcuts = {
    id: number;
    name: string;
    discontinued: boolean;
    stock: number;
    price: number;
}

export const useGetProducts = () => {
    const API = new Api();
    return useQuery({
        queryKey: ['products-details'],
        queryFn: async (): Promise<Prodcuts[]> => {
            return API.GetProducts().then((res) => res.data) as Promise<Prodcuts[]>;
        },
        refetchInterval: 1000,
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
    });
}