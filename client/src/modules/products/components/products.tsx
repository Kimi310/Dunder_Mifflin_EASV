import { Prodcuts, useGetProducts } from "../hooks/useGetProducts";

export const ProductsPage = () => {
    const { data: response, isLoading } = useGetProducts();
    const data = response as Prodcuts[];

    return (
        <div className="container mx-auto px-4">
            <div className="text-3xl font-semibold">Products Page</div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 relative mt-3">
                {response && data.map((product, index) => (
                    <div className="drop-shadow-md">
                        <img src="https://via.placeholder.com/1080" alt="product" className="rounded-2xl w-full h-52 object-cover" />
                        <div className="flex flex-col mt-2">
                            <div className="flex flex-row justify-between">
                                <div className="text-lg font-semibold">{product.name}</div>
                                <div className="text-lg font-semibold">${product.price}</div>
                            </div>
                            <button className="btn btn-primary mt-2">Add to cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}