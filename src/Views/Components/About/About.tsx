import './About.scss';
import { NavLink } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, CircleDollarSign } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ROUTES } from '../../../Shared/Constants';
import assets from '../../../assets';

const imgArr = [
 { img:assets.profile.accountant,name:'Abhishek',occupation:'Accountant'},
 {  img:assets.profile.contentwriter,name:'Ravi',occupation:'Contant Writer'},
  { img:assets.profile.designer,name:'Aman',occupation:'Designer'},
  { img:assets.profile.director,name:'Rohit',occupation:'Director'},
  { img:assets.profile.founder,name:'Devinder',occupation:'Founder'},
 {  img:assets.profile.marketingManager,name:'Krishna',occupation:'Marketing Manager'},
 {  img:assets.profile.salesManager,name:'Harsh',occupation:'Sales Manager'},
  { img:assets.profile.techLead,name:'Ajit',occupation:'Tech Lead'},
 {  img:assets.profile.teamlead,name:'Prabhat',occupation:'Team Lead'},
];

export default function About() {
  const [index, setIndex] = useState<number>(0);
  useEffect(() => {
    //  const interval =   setInterval(()=>{setIndex((index+3)<=6 ? index+3:0) },3000);
    //     return () => clearInterval(interval);
    const interval = setTimeout(() => {
      setIndex(index + 3 <= 6 ? index + 3 : 0);
    }, 3000);

    return () => clearTimeout(interval);
    // isko agar nhi lagayenge tho v sahi chalega magar agar kisi button kr click kr ke index change karenge tho yha ka set timeout ka v chalega fir v c h . iseley usko clear timeout karna jauri hai .
  }, [index]);

  return (
    <div className="about-container">
      <p className="breadcrumb">
        <NavLink to={ROUTES.HOMEPAGE}>Home /</NavLink>
        <NavLink to={ROUTES.ABOUT}> About</NavLink>
      </p>
      <div className="about-header">
        <div className="about-details">
          <h1>Our Story</h1>
          <p>
            Launched in 2015,Exclusive in South Asia's premier online shopping
            marketplace with an active presence in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers adn 300 brands and serves 3 millions customers
            across the region.
          </p>
          <p>
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assessment in categories
            ranging from consumer.
          </p>
        </div>
        <div className="about-img">
          <img src={assets.images.aboutImg} alt="about-section-img" />
        </div>
      </div>
      <div className="about-stats">
        <div>
          <img src={assets.icon.activeSeller} alt="activeSeller" />
          <h3>10.5k</h3>
          <p> Sellers active in our site</p>
        </div>

        <div>
          {' '}
          <CircleDollarSign color="white" fill="black" size={80} />
          <h3>33k</h3>
          <p> Monthly Product Sale</p>
        </div>
        <div>
          <img src={assets.icon.activeCustomber} alt="activeCustomber" />
          <h3>45k</h3>
          <p> Custombers active in our site</p>
        </div>
        <div>
          <img src={assets.icon.grossSale} alt="grossSale" />
          <h3>25k</h3>
          <p> Anual gross sale in our site</p>
        </div>
      </div>
      <div className="about-profile">
        <div className="about-profile-image">
          {imgArr.slice(index, index + 3).map((item) => (
            <div key={item.img} className="profile">
              <img src={item.img} alt={item.img} width="100px" height="100px" />

              <h3>{item.name}</h3>
              <p>{item.occupation}</p>

              <span>
                <a href="https://www.instagram.com/">
                  <Instagram size={20} />
                </a>{' '}
                <a href="https://x.com/?lang=en">
                  {' '}
                  <Twitter size={20} />
                </a>{' '}
                <a href="https://www.linkedin.com">
                  <Linkedin size={20} />
                </a>{' '}
              </span>
            </div>
          ))}
        </div>

        <div className="profile-scroll-btn">
          <button onClick={() => setIndex(0)} />
          <button onClick={() => setIndex(3)} />
          <button onClick={() => setIndex(6)} />
        </div>
      </div>
      <div className="about-features">
        <div>
          <img src={assets.icon.delivery} alt="devliveryImg" />
          <h3> FREE AND FAST DELIVERY</h3>
          <p> Free delivery for all orders over $140</p>
        </div>

        <div>
          <img src={assets.icon.guarantee} alt="guarantee" />
          <h3> 24/7 CUSTOMER SERVICE</h3>
          <p>Friendly 24/7 customer support </p>
        </div>

        <div>
          <img src={assets.icon.service} alt="service" />
          <h3>MONEY BACK GUARANTEE </h3>
          <p>We return money within 30 days </p>
        </div>
      </div>
    </div>
  );
}
