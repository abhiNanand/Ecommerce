import { useParams } from 'react-router-dom';
import { useGetProductByCategoryQuery } from '../../../Services/Api/module/demoApi';

import ShowItem from '../../../Views/Dashboard/Helper/Sales/ShowItem';

export default function Category() {
  const { category } = useParams();

  const {
    data: relatedProducts,
    error,
    isLoading,
  } = useGetProductByCategoryQuery(category);

  if (isLoading) return <p>Loading related products...</p>;
  if (error) return <p>Error loading related products.</p>;
  if (relatedProducts?.length === 0) return <p>No related products found.</p>;

  return (
    <>
      <h1>{category}</h1>
      <ShowItem products={relatedProducts} />
    </>
  );
}
