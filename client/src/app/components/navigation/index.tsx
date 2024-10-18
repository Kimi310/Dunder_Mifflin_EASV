import { useAuth, useLogout } from "@hooks/authentication/Authentication"
import { Link, Outlet } from "react-router-dom"
import {MyOrders} from "@modules/orders/MyOrders.tsx";


export const Navigation = () => {
    const { user, isLoggedIn } = useAuth()

    return (
        <>
            <div className="flex items-center justify-center gap-3 mt-5">
                <Link to="/">Prodcus</Link>
                <Link to="/orders">All Orders</Link>
                <Link to="/myorders"> MyOrders</Link>
                <Link to="/add-paper">Add paper</Link>

                {isLoggedIn ? <Link to="/user" className="font-bold">{user?.name}</Link> :
                    <Link to="/login">Login</Link>}

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>

                <Link to="/cart"><i className="fas fa-shopping-cart"></i></Link>

            </div>
            <Outlet/>
        </>
    )
}