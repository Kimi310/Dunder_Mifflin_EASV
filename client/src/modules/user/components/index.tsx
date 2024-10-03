import { UpdateCustomerDto } from "@Api";
import { useAuth, useLogout, useUpdaueCustomer } from "@hooks/authentication/Authentication";
import { useState } from "react";

export const User = () => {
    const { user, isLoggedIn } = useAuth();
    const [data, setData] = useState<UpdateCustomerDto>({
        id: user?.id! ?? 0,
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
      });

    const handleUpdate = () => {
        useUpdaueCustomer(data);
    }

    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-col justify-center items-center gap-5 mt-10">
                <h1 className="text-2xl font-bold">User Settings</h1>

                <div className="flex flex-col gap-2 text-lg">
                    <div className="flex flex-col gap-2">
                        <div>Name:</div>
                        <input type="text" placeholder={user?.name} value={data.name || ''} onChange={(e) => setData({ ...data, name: e.target.value || undefined })} className="p-2 rounded" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div>Email:</div>
                        <input type="text" placeholder={user?.email} content={user?.email} value={data.email || ''} onChange={(e) => setData({ ...data, email: e.target.value || undefined })} className="p-2 rounded" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div>Phone:</div>
                        <input type="text" placeholder={user?.phone} value={data.phone || ''} onChange={(e) => setData({ ...data, phone: e.target.value || undefined })} className="p-2 rounded" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div>Address:</div>
                        <input type="text" placeholder={user?.address} value={data.address || ''} onChange={(e) => setData({ ...data, address: e.target.value || undefined })} className="p-2 rounded" />
                    </div>
                </div>

                <div className="flex flex-row gap-10">
                    <button className="bg-red-500 text-black py-2 rounded p-10" onClick={useLogout}>Logout</button>
                    <button className="bg-green-500 text-black py-2 rounded p-10" onClick={handleUpdate}>Save</button>
                </div>
            </div>
        </div>
    )
}