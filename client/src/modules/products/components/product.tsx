import { useParams } from "react-router-dom";

export const ProductPage = () => {
    const { id } = useParams<{ id: string }>();
    
    return (
        <div className="container mx-auto px-4">
            Cool Product: {id}
        </div>
    )
}