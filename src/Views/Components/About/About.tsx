/* eslint-disable jsx-a11y/label-has-associated-control */
import './About.scss';
import { NavLink } from 'react-router-dom';
import { CircleDollarSign } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  ROUTES,
  WEBLINK,
  BREADCRUMB,
  ABOUT_PAGE,
} from '../../../Shared/Constants';
import assets from '../../../assets';

const imgArr = [
  {
    img: assets.profile.accountant,
    name: 'Abhishek',
    occupation: 'Accountant',
  },
  {
    img: assets.profile.contentwriter,
    name: 'Ravi',
    occupation: 'Contant Writer',
  },
  { img: assets.profile.designer, name: 'Aman', occupation: 'Designer' },
  { img: assets.profile.director, name: 'Rohit', occupation: 'Director' },
  { img: assets.profile.founder, name: 'Devinder', occupation: 'Founder' },
  {
    img: assets.profile.marketingManager,
    name: 'Krishna',
    occupation: 'Marketing Manager',
  },
  {
    img: assets.profile.salesManager,
    name: 'Harsh',
    occupation: 'Sales Manager',
  },
  { img: assets.profile.techLead, name: 'Ajit', occupation: 'Tech Lead' },
  { img: assets.profile.teamlead, name: 'Prabhat', occupation: 'Team Lead' },
];

export default function About() {
  const [index, setIndex] = useState<number>(0);
  useEffect(() => {
    const interval = setTimeout(() => {
      setIndex(index + 3 <= 6 ? index + 3 : 0);
    }, 3000);

    return () => clearTimeout(interval);
    // isko agar nhi lagayenge tho v sahi chalega magar agar kisi button kr click kr ke index change karenge tho yha ka set timeout ka v chalega fir v c h . iseley usko clear timeout karna jauri hai .
  }, [index]);

  return (
    <div className="about-container">
      <p className="breadcrumb">
        <NavLink to={ROUTES.HOMEPAGE}>{BREADCRUMB.HOME}</NavLink>
        <NavLink to={ROUTES.ABOUT}>{BREADCRUMB.ABOUT}</NavLink>
      </p>
      <div className="about-header">
        <div className="about-details">
          <h1>Our Story</h1>
          <p>{ABOUT_PAGE.PARAGRAPH_1}</p>
          <p>{ABOUT_PAGE.PARAGRAPH_2}</p>
        </div>
        <div className="about-img">
          <img src={assets.images.aboutImg} alt="about-section-img" />
        </div>
      </div>
      <div className="about-stats">
        <div>
          <img src={assets.icon.activeSeller} alt="activeSeller" />
          <h3>{ABOUT_PAGE.STATS[0].count}</h3>
          <p>{ABOUT_PAGE.STATS[0].label}</p>
        </div>
        <div>
          <CircleDollarSign color="white" fill="black" size={80} />
          <h3>{ABOUT_PAGE.STATS[0].count}</h3>
          <p>{ABOUT_PAGE.STATS[0].label}</p>
        </div>
        <div>
          <img src={assets.icon.activeCustomber} alt="activeCustomber" />
          <h3>{ABOUT_PAGE.STATS[1].count}</h3>
          <p>{ABOUT_PAGE.STATS[1].label}</p>
        </div>
        <div>
          <img src={assets.icon.grossSale} alt="grossSale" />
          <h3>{ABOUT_PAGE.STATS[2].count}</h3>
          <p>{ABOUT_PAGE.STATS[3].label}</p>
        </div>
      </div>
      <div className="about-profile">
        <div className="about-profile-image">
          {imgArr.slice(index, index + 3).map((item) => (
            <div key={item.img} className="profile">
              <img
                className="profile-images"
                src={item.img}
                alt={item.img}
                width="100px"
                height="100px"
              />
              <h3>{item.name}</h3>
              <p>{item.occupation}</p>
              <span>
                <a href={WEBLINK.INSTAGRAM}>
                  <img
                    src={assets.images.insta}
                    width="24px"
                    height="24px"
                    alt="instagram"
                  />
                </a>
                <a href={WEBLINK.TWITTER}>
                  <img
                    src={assets.images.twitter}
                    width="24px"
                    height="24px"
                    alt="twitter"
                  />
                </a>
                <a href={WEBLINK.LINKEDIN}>
                  <img
                    src={assets.images.linkedin}
                    width="24px"
                    height="24px"
                    alt="linkedin"
                  />
                </a>
              </span>
            </div>
          ))}
        </div>
        <div className="profile-scroll-btn">
          <button
            type="button"
            className={index === 0 ? 'active-index' : ''}
            onClick={() => setIndex(0)}
          />
          <button
            type="button"
            className={index === 3 ? 'active-index' : ''}
            onClick={() => setIndex(3)}
          />
          <button
            type="button"
            className={index === 6 ? 'active-index' : ''}
            onClick={() => setIndex(6)}
          />
        </div>
      </div>
      <div className="about-features">
        <div>
          <img src={assets.icon.delivery} alt="devliveryImg" />
          <h3> {ABOUT_PAGE.FEATURES[0].title}</h3>
          <p> {ABOUT_PAGE.FEATURES[0].description}</p>
        </div>

        <div>
          <img src={assets.icon.guarantee} alt="guarantee" />
          <h3>{ABOUT_PAGE.FEATURES[1].title}</h3>
          <p>{ABOUT_PAGE.FEATURES[1].description} </p>
        </div>

        <div>
          <img src={assets.icon.service} alt="service" />
          <h3>{ABOUT_PAGE.FEATURES[2].title}</h3>
          <p>{ABOUT_PAGE.FEATURES[2].description}</p>
        </div>
      </div>
    </div>
  );
}
