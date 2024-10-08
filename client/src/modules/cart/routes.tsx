import { RouteObject } from "react-router-dom";
import { Navigation } from "@app/components/navigation";
import { ShoppingCart } from "./components";

const ROUTES: RouteObject[] = [
    {
        path: '/MyOrder',
        element: <Navigation />,
        children: [
            { index: true, element: <ShoppingCart /> },
        ]
    }
]

export default ROUTES;