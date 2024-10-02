import { RouteObject } from "react-router-dom";
import { Navigation } from "@app/components/navigation";
import { User } from "./components";

const ROUTES: RouteObject[] = [
	{
		path: '/user',
		element: <Navigation />,
		children: [
			{ index: true, element: <User /> },
		]
	}
]

export default ROUTES;