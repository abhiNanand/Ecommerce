import { useState, useEffect } from 'react';
import { calculateTimeLeft } from '../../../../Shared/Utilities';
import { Product } from '../../../../Shared/Product';
import {TEXT} from '../../../../Shared/Constants';
import SalesItem from './helper/SalesItem';
import './Sales.scss';
interface SalesItemProps {
  products: Product[];
}

export default function Sales({ products }: Readonly<SalesItemProps>) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="sales-section">
      <div className="sales-heading">
        <div className="sales-highlight-bar" />
        <h3 className="sales-subtitle">{TEXT.TODAYS}</h3>
      </div>

      <div className="sales-timer">
        <div className="sales-title">
          <h1 className="sales-main-title">{TEXT.FLASH_SALES}</h1>
        </div>
        <div className="show-timer">
          {Object.entries(timeLeft).map(([label, value]) => (
            <div key={label} className="sales-timer-box">
              <span className="sales-timer-label">{label}</span>
              <span className="sales-timer-value">{value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="scroll">
        <SalesItem products={products} />
      </div>
    </div>
  );
}
