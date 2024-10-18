import ROUTES from "./routes"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import {Toaster} from "react-hot-toast";
import { CartProvider } from "@modules/cart/components/cartItem";
import {initAllOrdersAtom} from "@atoms/AllOrdersAtom.ts";
import {useEffect} from "react";

export const QUERY_CLIENT = new QueryClient();


const App = () => {
	const router = createBrowserRouter(ROUTES)
    useEffect(() => {
        initAllOrdersAtom();
    }, []);
    return (
        <CartProvider>
            <QueryClientProvider client={QUERY_CLIENT}>
                <RouterProvider router={router} />
            </QueryClientProvider>
            <Toaster position={"bottom-center"}/>
        </CartProvider>
    )
}

export default App;

