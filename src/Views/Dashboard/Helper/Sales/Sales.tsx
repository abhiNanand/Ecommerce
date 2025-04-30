import { useState, useEffect } from 'react';
import { calculateTimeLeft } from '../../../../Shared/Utilities';
import './Sales.scss';
import { SpinnerLoader } from '../Loaders/Loaders';
import { useGetProductQuery } from '../../../../Services/Api/module/demoApi';
import SalesItem from './helper/SalesItem';

export default function Sales() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);

    return () => clearInterval(timer);
  }, []);

    const { data: products, error, isLoading } = useGetProductQuery(null);
      if (isLoading) {
        return (
          <div className="loader">
            <SpinnerLoader />
          </div>
        );
      }
      if (error) {
        return (
          <div>
            <p>Error loading products. Please try again later.</p>
          </div>
        );
      }
  return (
    <div className="sales-section">
      <div className="sales-heading">
        <div className="sales-highlight-bar" />
        <h3 className="sales-subtitle">Today&apos;s</h3>
      </div>

      <div className="sales-timer">
        <div className="sales-title">
          <h1 className="sales-main-title">Flash Sales</h1>
        </div>
        {Object.entries(timeLeft).map(([label, value]) => (
          <div key={label} className="sales-timer-box">
            <span className="sales-timer-label">{label}</span>
            <span className="sales-timer-value">{value}</span>
          </div>
        ))}
      </div>
      <div className="scroll">
      <SalesItem products={products} />
      </div>
      
    </div>
  );
}
