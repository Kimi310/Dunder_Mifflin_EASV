import { RouteObject } from "react-router-dom";

import ProductsRoutes from "@modules/products/routes";
import LoginRoutes from "@modules/login/routes";
import UserRoutes from "@modules/user/routes";

const ROUTES: RouteObject[] = [
	...ProductsRoutes,
	...LoginRoutes,
	...UserRoutes,
]

export default ROUTES;