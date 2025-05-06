import { ROUTES_CONFIG } from '../Shared/Constants';
import { CustomRouter } from './RootRoutes';
import { SHARED_ROUTES } from './SharedRoutes';
import Cart from '../Views/Components/Cart/Cart';
import Wishlist from '../Views/Components/Wishlist/Wishlist';
import Checkout from '../Views/Components/Checkout/Checkout';
import Myaccount from '../Components/Layouts/Private/Account/MyAccount';
import Address from '../Components/Layouts/Private/Account/Address/Address';
import Profile from '../Components/Layouts/Private/Account/Profile/Profile';
import Order from '../Views/Components/Order/Order';
import BuyNow from '../Views/Components/BuyNow/BuyNow';

// eslint-disable-next-line import/prefer-default-export
export const PRIVATE_ROUTES: Array<CustomRouter> = [
  ...SHARED_ROUTES,
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
    path: ROUTES_CONFIG.CHECKOUT.path,
    element: <Checkout />,
    title: ROUTES_CONFIG.CHECKOUT.title,
  },
  {
    path: ROUTES_CONFIG.ACCOUNT.path,
    element: <Myaccount />,
    children: [
      { index: true, element: <Profile /> },
      { path: ROUTES_CONFIG.ADDRESS.path, element: <Address /> },
    ],
    title: ROUTES_CONFIG.ACCOUNT.title,
  },
  {
    path: ROUTES_CONFIG.ORDER.path,
    element: <Order />,
    title: ROUTES_CONFIG.ORDER.title,
  },
  {
    path: ROUTES_CONFIG.BUY.path,
    element: <BuyNow />,
    title: ROUTES_CONFIG.BUY.title,
  },
];
