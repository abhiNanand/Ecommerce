import { ROUTES_CONFIG  } from '../Shared/Constants';
import { CustomRouter } from './RootRoutes';
import Dashboard from '../Views/Dashboard';
import Cart from '../Components/Layouts/Private/Cart/Cart';
import Wishlist from '../Components/Layouts/Private/Wishlist/Wishlist';
import ProductDetails from '../Components/Layouts/ProductDetails/ProductDetails';
import Error from '../Components/Layouts/ErrorPage/Error';
// eslint-disable-next-line import/prefer-default-export
export const PRIVATE_ROUTES: Array<CustomRouter> = [
  {
    path: ROUTES_CONFIG.ABOUT.path,
    element: '<ABOUT />',
    title: ROUTES_CONFIG.ABOUT.title,
  },
  {
    path: ROUTES_CONFIG.HOMEPAGE.path,
    element: <Dashboard />,
    title: ROUTES_CONFIG.HOMEPAGE.title,
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
    path: ROUTES_CONFIG.WILDCARD.path,
    element: <Error/>,
    title: ROUTES_CONFIG.WILDCARD.title,
  },
  {
      path:ROUTES_CONFIG.PRODUCT_DETAILS.path,
      element:<ProductDetails/>,
      title:ROUTES_CONFIG.PRODUCT_DETAILS.title,
    },
];
