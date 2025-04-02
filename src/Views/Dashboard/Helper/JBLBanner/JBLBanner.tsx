import { useState, useEffect } from 'react';
import assets from '../../../../assets';
import './JblBanner.scss';

function JblBanner() {
  const targetDate = new Date('2025-08-25T23:59:59');
  targetDate.setDate(targetDate.getDate() + 5);

  const calculateTimeLeft = () => {
    const difference = targetDate.getTime() - new Date().getTime();
    if (difference > 0) {
      return {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
          2,
          '0'
        ),
        hours: String(
          Math.floor((difference / (1000 * 60 * 60)) % 24)
        ).padStart(2, '0'),
        minutes: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(
          2,
          '0'
        ),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
      };
    }
    return { days: '00', hours: '00', minutes: '00', seconds: '00' };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="jbl-banner">
      <div className="jbl-banner__content">
        <p className="category">Categories</p>
        <h2>
          Enhance Your <br /> Music Experience
        </h2>
        <div className="jbl-banner__timer">
          <div className="timer-box">
            <span>{timeLeft.days}</span>
            <p>Days</p>
          </div>
          <div className="timer-box">
            <span>{timeLeft.hours}</span>
            <p>Hour</p>
          </div>
          <div className="timer-box">
            <span>{timeLeft.minutes}</span>
            <p>Minutes</p>
          </div>
          <div className="timer-box">
            <span>{timeLeft.seconds}</span>
            <p>Seconds</p>
          </div>
        </div>
        <button className="buy-now" type="button">
          Buy Now!
        </button>
      </div>
      <div className="jbl-banner__image">
        <img src={assets.images.jblBox} alt="JBL Boombox" />
      </div>
    </section>
  );
}

export default JblBanner;
