import { ROUTES_CONFIG } from '../Shared/Constants';
import Dashboard from '../Views/Dashboard/Dashboard';
import { CustomRouter } from './RootRoutes';

// making changes;
import Category from '../Components/Layouts/Categories/Category';
import Login from '../Views/Auth/Login/Login';
import Signup from '../Views/Auth/Signup';
import ProductDetails from '../Components/Layouts/ProductDetails/ProductDetails';
import Error from '../Components/Layouts/ErrorPage/Error';
import Contact from '../Components/Layouts/Contact/Contact';
import About from '../Components/Layouts/About/About';
import Shop from '../Components/Layouts/Shop/Shop';
import SearchItem from '../Components/Layouts/Search/SearchItem';
import Wishlist from '../Components/Layouts/Private/Wishlist/Wishlist';
import Cart from '../Components/Layouts/Private/Cart/Cart';
import BuyNow from '../Components/Layouts/BuyNow/BuyNow';
import Browse from '../Views/Dashboard';

// eslint-disable-next-line import/prefer-default-export
export const PUBLIC_ROUTES: Array<CustomRouter> = [
  {
    path: ROUTES_CONFIG.HOMEPAGE.path,
    element: <Dashboard />,
    title: ROUTES_CONFIG.HOMEPAGE.title,
  },
  {
    path: `${ROUTES_CONFIG.LOGIN.path}`,
    title: ROUTES_CONFIG.LOGIN.title,
    element: <Login />,
  },
  {
    path: ROUTES_CONFIG.WILDCARD.path,
    element: <Error />,
    title: ROUTES_CONFIG.WILDCARD.title,
  },
  {
    path: `${ROUTES_CONFIG.SIGNUP.path}`,
    element: <Signup />,
    title: ROUTES_CONFIG.SIGNUP.title,
  },
  {
    path: ROUTES_CONFIG.PRODUCT_DETAILS.path,
    element: <ProductDetails />,
    title: ROUTES_CONFIG.PRODUCT_DETAILS.title,
  },
  {
    path: ROUTES_CONFIG.CATEGORY.path,
    element: <Category />,
    title: ROUTES_CONFIG.CATEGORY.title,
  },
  {
    path: ROUTES_CONFIG.CONTACT.path,
    element: <Contact />,
    title: ROUTES_CONFIG.CONTACT.title,
  },
  {
    path: ROUTES_CONFIG.ABOUT.path,
    element: <About />,
    title: ROUTES_CONFIG.ABOUT.title,
  },
  {
    path: ROUTES_CONFIG.SHOP.path,
    element: <Shop />,
    title: ROUTES_CONFIG.SHOP.title,
  },
  {
    path: ROUTES_CONFIG.SEARCH.path,
    element: <SearchItem />,
    title: ROUTES_CONFIG.SEARCH.title,
  },
  {
    path: ROUTES_CONFIG.WISHLIST.path,
    element: <Wishlist />,
    title: ROUTES_CONFIG.WISHLIST.title,
  },
  {
    path: ROUTES_CONFIG.CART.path,
    element: <Cart />,
    title: ROUTES_CONFIG.CART.title,
  },
  {
    path: ROUTES_CONFIG.BUY.path,
    element: <BuyNow />,
    title: ROUTES_CONFIG.BUY.title,
  },
  {
    path:ROUTES_CONFIG.BROWSE.path,
    element:<Browse/>,
    title:ROUTES_CONFIG.BROWSE.title,
},
];
