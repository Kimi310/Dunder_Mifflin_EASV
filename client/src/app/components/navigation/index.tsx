import { Link, Outlet } from "react-router-dom"

export const Navigation = () => {
    return (
        <>
            <div className="flex items-center justify-center gap-3">
                <Link to="/">Prodcus</Link>
                <Link to="/">My Orders</Link>
                <Link to="/add-paper">Add paper</Link>
                <div className="">Admin</div>
            </div>
            <Outlet />
        </>
    )
}