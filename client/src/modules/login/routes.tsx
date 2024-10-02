import { RouteObject } from "react-router-dom";
import { Navigation } from "@app/components/navigation";
import { Login } from "./components";

const ROUTES: RouteObject[] = [
	{
		path: '/login',
		element: <Navigation />,
		children: [
			{ index: true, element: <Login /> },
		]
	}
]

export default ROUTES;