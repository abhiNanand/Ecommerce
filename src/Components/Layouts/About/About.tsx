import './About.scss';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../Shared/Constants';
import assets from '../../../assets';
export default function About() {
    return (
        <div className="about-container">
            <span> <Link to={ROUTES.HOMEPAGE}>HOME</Link> / About</span>
            <div className="about-header">
                <div className="about-details">
                    <h1>Our Story</h1>
                    <p>Launched in 2015,Exclusive in South Asia's premier online shopping marketplace with an active presence in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers adn 300 brands and serves 3 millions customers across the region.</p>
                    <p>Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assessment in categories ranging from consumer.</p>
                </div>
                <div className="about-img">
                    <img src={assets.images.aboutImg} alt="about-section-img" />
                </div>
            </div>
            <div className="about-stats">
                <div><img src={assets.icon.activeSeller} alt="activeSeller" />
                <h3>10.5k</h3>
                <p> Sellers active in our site</p>
                </div>
              
                <div><img src={assets.icon.productionSale} alt="productionSale" />
                <h3>33k</h3>
                <p> Monthly Product Sale</p>
                </div>
                <div><img src={assets.icon.activeCustomber} alt="activeCustomber" />
                <h3>45k</h3>
                <p> Custombers active  in our site</p>
                </div>
                <div><img src={assets.icon.grossSale} alt="grossSale" />
                <h3>25k</h3>
                <p> Anual gross sale in our site</p>
                </div>
            </div>
            {/* <div className="about-social-links">
               leaving it for some time. 
            </div> */}
            <div className="about-features">
<div> 
<img src={assets.icon.delivery} alt="devliveryImg"/> 
<h3> FREE AND FAST DELIVERY</h3>
<p> Free delivery for all orders over $140</p>
</div>

<div> 
<img src={assets.icon.guarantee} alt="guarantee"/> 
<h3> 24/7 CUSTOMER SERVICE</h3>
<p>Friendly 24/7 customer support </p>
</div>

<div> 
<img src={assets.icon.service} alt="service"/> 
<h3>MONEY BACK GUARANTEE </h3>
<p>We return money within 30 days </p>
</div>
            </div>
        </div>
    );
}

// delivery:'src/assets/icon/delivery.png',
// guarantee:'src/assets/icon/guarantee.png',
// service:'src/assets/icon/service.png',



//filtering seraching payment name change old orders ,cancellation, adding address.