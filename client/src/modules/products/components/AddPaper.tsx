
import { useState } from "react";
import { useAtom } from "jotai/index";
import { PaperAtom } from "@atoms/PaperAtom.ts";
import { Paper } from "@assets/models/Paper.ts";
import { Api, PaperDto } from "@Api.ts";
import { AxiosResponse } from "axios";
import { toast } from "react-hot-toast";
import {PropertiesAtom} from "@atoms/PropertiesAtom.ts";
import {Property} from "@assets/models/Property.ts";

export const AddPaper = ()=>{  
    const newPaper : Paper ={
        name: "",
        price: 0,
        stock:0
    }

    const [papers, setPapers] = useAtom(PaperAtom);
    const [paper, setPaper] = useState(newPaper);
    const [properties, setProperties] = useAtom(PropertiesAtom);
    const [paperProperties, setPaperProperties] = useState<Property[]>([]);

    const addPaper = () => {
        if (paper.name != "" && paper.price>0 && paper.stock>0){
            new Api().paper.paperCreatePaper(paper).then((r: AxiosResponse<PaperDto>) =>{
                toast.success("Paper has been added successfully!");
                const newPaperData: Paper = {
                    discontinued: r.data.discontinued,
                    // @ts-ignore
                    price: r.data.price,
                    // @ts-ignore
                    stock: r.data.stock,
                    // @ts-ignore
                    name: r.data.name,
                    id: r.data.id
                };

                let updatedPapers = [...papers, newPaperData];
                console.log(paperProperties);
                setPapers(updatedPapers);
                setPaper(newPaperData);
            });
        }else {
            toast.error("Some fields are empty or invalid")
        }
    }

    function handlePaperProperties(property: Property) {
        if (paperProperties.includes(property)) {
            // Remove the property if it's already in the list
            setPaperProperties(prevProperties =>
                prevProperties.filter(p => p !== property)
            );
        } else {
            // Add the property if it's not in the list
            setPaperProperties(prevProperties =>
                [...prevProperties, property]
            );
        }
    }


    return (
    <div className="flex justify-center">
        <div className="flex flex-col justify-center items-center w-80 pt-5">
            <h1 className="font-bold text-4xl">Add paper details</h1>
            <div className="flex flex-row justify-between items-center w-full mt-5" >
                <div className="flex flex-col items-center h-full space-y-10 mt-4">
                    <label className="text-xl">Name</label>
                    <label className="text-xl">Stock</label>
                    <label className="text-xl">Price</label>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <input className="input input-bordered w-64 mb-5" onChange={change => {
                        setPaper({...paper, name: change.target.value});
                    }}/>
                    <input type="number" className="input input-bordered w-full mb-5" onChange={change => {
                        setPaper({...paper, stock: Number(change.target.value)});
                    }}/>
                    <input type="number" className="input input-bordered w-full" onChange={change => {
                        setPaper({...paper, price: Number(change.target.value)});
                    }}/>
                    <details className="dropdown mt-5 w-full">
                        <summary className="btn m-1 w-full">Properties</summary>
                        <ul className="menu dropdown-content  bg-base-100 rounded-box z-[1] w-full p-2 shadow">
                            <form>
                                {properties.map((p, i) => (
                                    <li>
                                        <label>
                                            <input type="checkbox" id={p.propertyName} value={p.propertyName} onChange={()=>handlePaperProperties(p)}/>
                                            {p.propertyName}
                                        </label>
                                    </li>
                                ))}
                            </form>
                        </ul>
                    </details>
                </div>
            </div>
            <div className="flex flex-row justify-end items-center w-full mt-5">
                <button onClick={() => addPaper()} className={"btn btn-primary"}>Accept</button>
            </div>
        </div>
    </div>
    )
}