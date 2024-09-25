import { RouteObject } from "react-router-dom";
import { Navigation } from "@app/components/navigation";
import { ProductsPage } from "./components/products";
import {AddPaper} from "@modules/products/components/AddPaper.tsx";

const ROUTES: RouteObject[] = [
	{
		path: '/',
		element: <Navigation />,
		children: [
			{ index: true, element: <ProductsPage /> },
			{ path: "/add-paper", element: <AddPaper /> }
		]
	}
]

export default ROUTES;