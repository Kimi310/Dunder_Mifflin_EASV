import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import {Api, PaperDto} from "@Api.ts";
import {AxiosResponse} from "axios";
import {Paper} from "@assets/models/Paper.ts";
import {toast} from "react-hot-toast";

export const ProductPage = () => {
    const params= useParams();
    const [paper, setPaper] = useState<Paper>();
    const [restock, setRestock] = useState<number>(0);
    useEffect(() => {
        new Api().paper.paperGetPaper(Number.parseInt(params.id as string)).then((r: AxiosResponse<PaperDto>) => {
            const newPaper: Paper = {
            discontinued: r.data.discontinued,
            // @ts-ignore
            price: r.data.price,
            // @ts-ignore
            stock: r.data.stock,
            // @ts-ignore
            name: r.data.name,
            id: r.data.id,
                properties: r.data.properties
            };
            setPaper(newPaper);
        });
    }, []);

    if (paper == undefined){
        return (
            <div className="text-6xl">Loading...</div>
        )
    }

    function updateDiscontinued() {
            // @ts-ignore
            new Api().paper.paperUpdateDiscontinued(paper?.id,!paper?.discontinued).then((r: AxiosResponse<PaperDto>)=>{
                const newPaperData: Paper = {
                    discontinued: r.data.discontinued,
                    // @ts-ignore
                    price: r.data.price,
                    // @ts-ignore
                    stock: r.data.stock,
                    // @ts-ignore
                    name: r.data.name,
                    id: r.data.id,
                    properties : r.data.properties
                };
                setPaper({...newPaperData});
                newPaperData.discontinued ? toast.success("Paper has been discontinued successfully!") : toast.success("Paper has been made available successfully!");
            })
    }

    function updateRestock(){
        // @ts-ignore
        new Api().paper.paperUpdateRestock(paper?.id,restock).then((r: AxiosResponse<PaperDto>)=>{
            const newPaperData: Paper = {
                discontinued: r.data.discontinued,
                // @ts-ignore
                price: r.data.price,
                // @ts-ignore
                stock: r.data.stock,
                // @ts-ignore
                name: r.data.name,
                id: r.data.id,
                properties: r.data.properties
            };
            setPaper({...newPaperData});
            toast.success("Paper has been restocked successfully!");
        })
    }

    return (
        <div className="flex justify-center">
            <div className="flex flex-col justify-center items-center pt-5">
                <div className="flex flex-col justify-between items-center w-full mt-5">
                    <label className="text-6xl">Paper name: {paper?.name}</label>
                    <div className="flex flex-row justify-between items-center w-96 mt-10">
                        <label className="text-2xl">Status: {paper?.discontinued ? 'Discontinued' : 'Available'}</label>
                        <button className="btn"
                                onClick={() => updateDiscontinued()}>{paper?.discontinued ? 'Make available' : 'Discontinue'}</button>
                    </div>
                    <div className="flex flex-row items-center w-96 mt-10">
                        <label className="text-2xl">Properties</label>
                    </div>

                    {paper.properties && paper.properties.length > 0 ? (
                        paper.properties.map(p => (
                            <div key={p.id} className="flex flex-row items-center w-96 mt-10">
                                <label className="text-2xl">{p.propertyName}</label>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-row items-center w-96 mt-10">
                            <label className="text-2xl">There are no properties</label>
                        </div>
                    )}
                    <div className="flex flex-row items-center w-96 mt-10">
                        <label className="text-2xl">Stock: {paper.stock}</label>
                    </div>
                    <div className="flex flex-row justify-between items-center w-96 mt-10">
                        <label className="text-2xl">Restock</label>
                        <input type="number" value={restock} className="input input-bordered w-64" onChange={change => {
                            setRestock(Number.parseInt(change.target.value));
                        }}/>
                    </div>
                    <div className="flex flex-row justify-end items-center w-96 mt-5">
                        <button className="btn" onClick={() => updateRestock()}>Restock</button>
                    </div>
                </div>
            </div>
        </div>
    )
}