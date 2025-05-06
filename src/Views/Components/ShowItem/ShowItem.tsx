import { Product } from '../../../Shared/Product';
import ProductList from '../ProductList/ProductList';

interface ShowItemProps {
  products: Product[];
  wishlistUpdated?: boolean;
}

export default function ShowItem({ products }: Readonly<ShowItemProps>) {
  return (
    <div
      className={
        products && products.length > 4
          ? 'products-grid-greater'
          : 'products-grid-lesser'
      }
    >
      <ProductList products={products} />
    </div>
  );
}
