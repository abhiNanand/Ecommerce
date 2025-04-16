import './BrowseCategory.scss';
import assets from '../../../../assets';
import {useNavigate} from 'react-router-dom';

export default function BrowseCategory() {

  const navigate = useNavigate();

  const categories = [
    { name: 'Phone', icon: assets.icon.cellPhone },
    { name: 'Computer', icon: assets.icon.computer },
    { name: 'Smartwatch', icon: assets.icon.smartWatch },
    { name: 'Camera', icon: assets.icon.camera },
    { name: 'Headphone', icon: assets.icon.headPhone },
    { name: 'Gamepad', icon: assets.icon.gamepad },
  ];
  
  return (
    <div className="browse-category-container">
      <div className="category-header">
        <div className="category-highlight-bar" />
        <h3 className="category-title">Categories</h3>
      </div>
      <h1 className="category-subtitle">Browse By Category</h1>
      <div className="category-grid">
        {categories.map((item) => (
          <div className="category-item" key={item.name} onClick={()=>navigate(`/browse/${item.name}`)} >
            <img src={item.icon} alt={item.name} className="category-icon" />
            <p className="category-label">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
