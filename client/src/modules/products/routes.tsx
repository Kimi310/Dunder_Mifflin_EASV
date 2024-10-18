import { RouteObject } from "react-router-dom";
import { Navigation } from "@app/components/navigation";
import { ProductsPage } from "./components/products";
import {AddPaper} from "@modules/products/components/AddPaper.tsx";
import { ProductPage } from "./components/product";
import {Orders} from "@modules/orders/Orders.tsx";
import {MyOrders} from "@modules/orders/MyOrders.tsx";

const ROUTES: RouteObject[] = [
	{
		path: '/',
		element: <Navigation />,
		children: [
			{ index: true, element: <ProductsPage /> },
			{ path: "/add-paper", element: <AddPaper /> },
			{ path: "/paper/:id", element: <ProductPage /> },
			{ path: "/orders", element: <Orders/>},
			{path: "/myorders", element: <MyOrders/>}
		]
	}
]

export default ROUTES;