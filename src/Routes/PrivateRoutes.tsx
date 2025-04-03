import { ROUTES_CONFIG } from '../Shared/Constants';
import { CustomRouter } from './RootRoutes';
import Dashboard from '../Views/Dashboard';
import Cart from '../Components/Layouts/Private/Cart/Cart';
import Wishlist from '../Components/Layouts/Private/Wishlist/Wishlist';
import Error from '../Components/Layouts/ErrorPage/Error';
import Category from '../Components/Layouts/Categories/Category';
import ProductDetails from '../Components/Layouts/ProductDetails/ProductDetails';
import Checkout from '../Components/Layouts/Private/Checkout/Checkout';
import Myaccount, {
  Cancel,
  Return,
  Payment,
  Address,
} from '../Components/Layouts/Private/Account/MyAccount';
import Profile from '../Components/Layouts/Private/Account/Profile/Profile';
import Contact from '../Components/Layouts/Contact/Contact';
import About from '../Components/Layouts/About/About';
// eslint-disable-next-line import/prefer-default-export
export const PRIVATE_ROUTES: Array<CustomRouter> = [
  {
    path: ROUTES_CONFIG.ABOUT.path,
    element: <About/>,
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
    element: <Error />,
    title: ROUTES_CONFIG.WILDCARD.title,
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
    path: ROUTES_CONFIG.CHECKOUT.path,
    element: <Checkout />,
    title: ROUTES_CONFIG.CHECKOUT.title,
  },
  {
    path: ROUTES_CONFIG.ACCOUNT.path,
    element: <Myaccount />,
    children: [
      { index: true, element: <Profile /> },
      { path: ROUTES_CONFIG.CANCLE.path, element: <Cancel /> },
      { path: ROUTES_CONFIG.RETURN.path, element: <Return /> },
      { path: ROUTES_CONFIG.PAYMENT.path, element: <Payment /> },
      { path: ROUTES_CONFIG.ADDRESS.path, element: <Address /> },
    ],
    title: ROUTES_CONFIG.ACCOUNT.title,
  },
  {
    path: ROUTES_CONFIG.CONTACT.path,
    element: <Contact />,
    title: ROUTES_CONFIG.CONTACT.title,
  },
];
