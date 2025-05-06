import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import ProductList from '../../../../Components/ProductList/ProductList';
import { Product } from '../../../../../Shared/Product';

interface ShowItemProps {
  products: Product[];
}

export default function ShowItem({ products }: Readonly<ShowItemProps>) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -200,
        behavior: 'smooth',
      });
    }
  };
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 200,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <div className="arrows">
        <button className="left-arrow" onClick={() => scrollLeft()}>
          <ArrowLeft size={20} />
        </button>
        <button className="right-arrow" onClick={() => scrollRight()}>
          <ArrowRight size={20} />
        </button>
      </div>
      <div className="sales-products-grid" ref={scrollRef}>
        <ProductList products={products} />
      </div>
    </>
  );
}
