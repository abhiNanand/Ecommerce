import './BrowseCategory.scss';
import { useNavigate } from 'react-router-dom';
import { TEXT } from '../../../../Shared/Constants';
import assets from '../../../../assets';

export default function BrowseCategory() {
  const navigate = useNavigate();

  const categories = [
    {
      name: 'Women',
      icon: assets.icon.women,
      link: "/category/women's clothing",
    },
    {
      name: 'Men',
      icon: assets.icon.men,
      link: "/category/men's clothing",
    },
    {
      name: 'Electronics',
      icon: assets.icon.electronics,
      link: '/category/electronics',
    },
    {
      name: 'Jewellery',
      icon: assets.icon.jewellery,
      link: '/category/jewelery',
    },
    {
      name: 'Headphone',
      icon: assets.icon.headPhone,
      link: '/browse',
    },
    {
      name: 'Games',
      icon: assets.icon.games,
      link: '/browse',
    },
  ];

  return (
    <div className="browse-category-container">
      <div className="category-header">
        <div className="category-highlight-bar" />
        <h3 className="category-titles">{TEXT.CATEGORIES}</h3>
      </div>
      <h1 className="category-subtitle">{TEXT.BROWSE_BY_CATEGORIES}</h1>
      <div className="category-grid">
        {categories.map((item) => (
          <button
            type="button"
            className="category-item"
            key={item.name}
            onClick={() => navigate(item.link)}
          >
            <img src={item.icon} alt={item.name} className="category-icon" />
            <p className="category-label">{item.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
