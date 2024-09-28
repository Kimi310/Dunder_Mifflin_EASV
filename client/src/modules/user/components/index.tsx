import { useAuth, useLogout } from "@hooks/authentication/Authentication";

export const User = () => {
    const { user, isLoggedIn } = useAuth();

    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-col justify-center items-center text-center gap-5 mt-10">
                <h1 className="text-2xl font-bold my-5">User</h1>
                <div className="flex flex-col gap-2 text-lg">
                    <p>Username: {user?.name}</p>
                    <p>Email: {user?.email}</p>
                </div>
                <button className="bg-red-500 text-black py-2 rounded p-10" onClick={useLogout}>Logout</button>
            </div>
        </div>
    )
}