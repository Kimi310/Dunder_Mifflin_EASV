import { RouteObject } from "react-router-dom";
import { Navigation } from "@app/components/navigation";
import { ShoppingCart } from "./components/index";

const ROUTES: RouteObject[] = [
    
    {
    
        path: '/cart',
        element: <Navigation />,
        children: [
            { index: true, element: <ShoppingCart /> },
        ]
        
    }
    
]

export default ROUTES;