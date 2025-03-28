import { useGetProductByCategoryQuery } from "../../../Services/Api/module/demoApi";
import './Category.scss';
import ShowItem from '../../../Views/Dashboard/Helper/Sales/ShowItem';
import { useParams } from "react-router-dom";

export default function Category() {

    console.log("category page");
    const {category}=useParams();
     
    const {
        data: relatedProducts,
        error: relatedError,
        isLoading: relatedLoading,
    } = useGetProductByCategoryQuery(category);

    return (<>
    <h1>{category}</h1>
        {relatedLoading ? (
            <p>Loading related products...</p>
        ) : relatedError ? (
            <p>Error loading related products.</p>
        ) : relatedProducts?.length ? (
            <ShowItem products={relatedProducts} />
        ) : (
            <p>No related products found.</p>
        )}
    </>);
}