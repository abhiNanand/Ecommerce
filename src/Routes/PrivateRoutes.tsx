import { Navigate } from 'react-router-dom';
import { ROUTES_CONFIG, WILDCARD_ROUTES } from '../Shared/Constants';
import { CustomRouter } from './RootRoutes';
import Dashboard from '../Views/Dashboard';
import Cart from '../Components/Layouts/Private/Cart/Cart';
import Wishlist from '../Components/Layouts/Private/Wishlist/Wishlist';

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
    path: '*',
    element: <Navigate to={WILDCARD_ROUTES.PRIVATE} />,
    title: 'Rendering wildcard',
  },
];
