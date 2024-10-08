import {useAtom} from "jotai";
import {Property} from "@assets/models/Property.ts";
import {PropertiesAtom} from "@atoms/PropertiesAtom.ts";
import {Link} from "react-router-dom";

export const Properties = ()=>{
    const [properties, setProperties] = useAtom(PropertiesAtom);

    return <>
        <div className="grid grid-cols-1 relative">
            {properties.map((product, index) => (
                <div key={index} className="drop-shadow-md">
                    <img src="https://via.placeholder.com/1080" alt="product"
                         className="rounded-2xl w-full h-52 object-cover"/>
                    <div className="flex flex-col mt-2">
                        <div className="flex flex-row justify-between">
                            <div className="text-lg font-semibold">{product.name}</div>
                        </div>
                        <Link to={`/paper/${product.id}`} className="btn btn-primary mt-2">View Item</Link>
                    </div>
                </div>
            ))}
        </div>
    </>
}