
import { useState } from "react";
import { useAtom } from "jotai/index";
import { PaperAtom } from "@atoms/PaperAtom.ts";
import { Paper } from "@assets/models/Paper.ts";
import { Api, PaperDto } from "@Api.ts";
import { AxiosResponse } from "axios";
import { toast } from "react-hot-toast";

export const AddPaper = ()=>{
    const newPaper : Paper ={
        name: "",
        price: 0,
        stock:0
    }

    const [papers,setPapers] = useAtom(PaperAtom);
    const [paper, setPaper] = useState(newPaper);

    const addPaper = () => { 
        new Api().CreatePaper({name:paper.name, price:paper.price, stock:paper.stock}).then((r: AxiosResponse<PaperDto>) =>{
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

            setPapers(updatedPapers);
            setPaper(newPaperData);

            console.log(updatedPapers);
        });
    }


    return (
    <div className="flex justify-center">
        <div className="flex flex-col justify-center items-center w-80 pt-5">
            <h1 className="font-bold text-4xl">Add paper details</h1>
            <div className="flex flex-row justify-between items-center w-full mt-5" >
                <div className="flex flex-col justify-center items-center space-y-10">
                    <label className="text-xl">Name</label>
                    <label className="text-xl">Stock</label>
                    <label className="text-xl">Price</label>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <input className="input input-bordered w-64 mb-5" onChange={change => {
                        setPaper({...paper,name: change.target.value});
                    }}/>
                    <input type="number" className="input input-bordered w-full mb-5" onChange={change => {
                        setPaper({...paper,stock: Number(change.target.value)});
                    }}/>
                    <input type="number" className="input input-bordered w-full" onChange={change => {
                        setPaper({...paper,price: Number(change.target.value)});
                    }}/>
                </div>
            </div>
            <div className="flex flex-row justify-end items-center w-full mt-5">
                <button onClick={()=> addPaper()} className={"btn"}>Accept</button>
            </div>
        </div>
    </div>
    )
}