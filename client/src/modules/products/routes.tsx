import { RouteObject } from "react-router-dom";
import { Navigation } from "@app/components/navigation";
import { ProductsPage } from "./components/products";
import {AddPaper} from "@modules/products/components/AddPaper.tsx";
import { ProductPage } from "./components/product";
import {Properties} from "@modules/Properties/Properties.tsx";

const ROUTES: RouteObject[] = [
	{
		path: '/',
		element: <Navigation />,
		children: [
			{ index: true, element: <ProductsPage /> },
			{ path: "/add-paper", element: <AddPaper /> },
			{ path: "/paper/:id", element: <ProductPage /> },
			{ path: "/properties", element: <Properties/>}
		]
	}
]

export default ROUTES;