import {useState} from "react";
import {Property} from "@assets/models/Property.ts";
import {Api, PaperDto, PropertyDto} from "@Api.ts";
import {AxiosResponse} from "axios";
import {toast} from "react-hot-toast";
import {Paper} from "@assets/models/Paper.ts";
import {useAtom} from "jotai";
import {PropertiesAtom} from "@atoms/PropertiesAtom.ts";

export const AddProperties = ()=>{
    const [property,setProperty]=useState<Property>();
    const [properties,setProperties]=useAtom(PropertiesAtom);

    function addProperty(){
        //@ts-ignore
        new Api().property.propertyCreateProperty(property).then((r: AxiosResponse<PropertyDto>) =>{
            toast.success("Property has been added successfully!");
            const newProperty: Property = {
                // @ts-ignore
                propertyName: r.data.propertyName,
                id: r.data.id
            };

            let updatedPapers = [...properties, newProperty];

            setProperties(updatedPapers);
        });
    }

    return <>
        <div className="flex justify-center">
            <div className="flex flex-col justify-center items-center w-80 pt-5">
                <h1 className="font-bold text-4xl">Add paper details</h1>
                <div className="flex flex-row justify-between items-center w-full mt-5">
                    <div className="flex flex-col justify-center items-center">
                        <label className="text-xl">Name</label>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <input className="input input-bordered w-64" onChange={change => {
                            setProperty({...property, propertyName: change.target.value});
                        }}/>
                    </div>
                </div>
                <div className="flex flex-row justify-end items-center w-full mt-5">
                    <button onClick={() => addProperty()} className={"btn btn-primary"}>Accept</button>
                </div>
            </div>
        </div>
    </>
}