import { useParams } from "react-router-dom";

export const ProductPage = () => {
    const params= useParams();
    
    return (
        <div className="container mx-auto px-4">
            Cool Product: {params.id}
        </div>
    )
}