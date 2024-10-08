import { useAuth, useLogout } from "@hooks/authentication/Authentication"
import { Link, Outlet } from "react-router-dom"

export const Navigation = () => {
    const { user, isLoggedIn } = useAuth()

    return (
        <>
            <div className="flex items-center justify-center gap-3 mt-5">
                <Link to="/">Papers</Link>
                <Link to="/">My Orders</Link>
                <Link to="/add-paper">Add paper</Link>
                <Link to={"/properties"}>Properties</Link>
                {isLoggedIn ? <Link to="/user" className="font-bold">{user?.name}</Link> : <Link to="/login">Login</Link>}
            </div>
            <Outlet />
        </>
    )
}