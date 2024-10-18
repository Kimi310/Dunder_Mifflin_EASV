import {useAtom} from "jotai";
import {Property} from "@assets/models/Property.ts";
import {PropertiesAtom} from "@atoms/PropertiesAtom.ts";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {Api} from "@Api.ts";

export const Properties = ()=>{
    const [properties, setProperties] = useAtom(PropertiesAtom);

    return <>
        <div className="flex justify-center">
            <div className="flex flex-col justify-center items-center w-60 pt-5">
                <h1 className="font-bold text-4xl mb-3">Properties list</h1>
                {properties.map((property, index) => (
                    <div key={index} className="drop-shadow-md flex justify-center items-center mt-3">
                        <div className="text-lg font-semibold">{index+1}. {property.propertyName}</div>
                    </div>
                ))}
                <div className="flex justify-end items-center mt-5 w-full">
                    <Link className="btn btn-primary" to={"/properties/add-property"}>Add properties</Link>
                </div>
            </div>
        </div>
    </>
}