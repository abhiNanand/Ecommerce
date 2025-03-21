


import './Sales.scss';
import  { useState, useEffect } from 'react';
 



export default function Sales() {

    const calculateTimeLeft = () => {
        const targetTime = new Date().setHours(23, 59, 59, 999);
        const now = new Date().getTime();
        const difference = targetTime - now;

        if (difference <= 0) {
            return { days: "00", hours: "00", minutes: "00", seconds: "00" };

        }
        //the difference is in millisecond that why dividing by 10000 
        return {
            Days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
                2,
                "0"
            ),
            Hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(
                2,
                "0"
            ),
            Minutes: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(
                2,
                "0"
            ),
            Seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
        };
    };


    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() =>
        setTimeLeft(calculateTimeLeft()),
            1000);
        
        return
        () => clearInterval(timer);

    }, []);

    return (

        <div className="sales-section">
            <div className="sales-heading">
                <div className="sales-highlight-bar"></div>
                <h3 className="sales-subtitle">Today's</h3>
                
            </div>

            <div className="sales-timer">
            <div className="sales-title">
                    <h1 className="sales-main-title">Flash Sales</h1>
                </div>
                {Object.entries(timeLeft).map(([label, value]) =>
                    <div key={label}
                        className="sales-timer-box">
                        <span className="sales-timer-label">{label}</span>
                        <span className="sales-timer-value">{value}</span>
                    </div>
                )}
            </div>
            
        </div>
    );
}