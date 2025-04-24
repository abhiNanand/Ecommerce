import './BrowseCategory.scss';
import assets from '../../../../assets';
import {useNavigate} from 'react-router-dom';

export default function BrowseCategory() {

  const navigate = useNavigate();

  const categories = [
    { name: 'Phone', icon: assets.icon.cellPhone ,link:"/category/women's clothing"},
    { name: 'Computer', icon: assets.icon.computer,link:"/category/men's clothing" },
    { name: 'Smartwatch', icon: assets.icon.smartWatch,link:"/category/electronics" },
    { name: 'Camera', icon: assets.icon.camera,link:"/category/jewelery" },
    { name: 'Headphone', icon: assets.icon.headPhone,link:"/category/electronics" },
    { name: 'Gamepad', icon: assets.icon.gamepad,link:"/category/women's clothing" },
  ];
  
  return (
    <div className="browse-category-container">
      <div className="category-header">
        <div className="category-highlight-bar" />
         <h3 className="category-titles">Categories</h3>  
      
      </div>
      <h1 className="category-subtitle">Browse By Category</h1>
      <div className="category-grid">
        {categories.map((item) => (
          <div className="category-item" key={item.name} onClick={()=>navigate(item.link)} >
            <img src={item.icon} alt={item.name} className="category-icon" />
            <p className="category-label">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
