import { ROUTES_CONFIG } from '../Shared/Constants';
import { CustomRouter } from './RootRoutes';
import Dashboard from '../Views/Dashboard/Dashboard';
import Cart from '../Components/Layouts/Private/Cart/Cart';
import Wishlist from '../Components/Layouts/Private/Wishlist/Wishlist';
import Error from '../Components/Layouts/ErrorPage/Error';
import Category from '../Components/Layouts/Categories/Category';
import ProductDetails from '../Components/Layouts/ProductDetails/ProductDetails';
import Checkout from '../Components/Layouts/Private/Checkout/Checkout';
import Myaccount from '../Components/Layouts/Private/Account/MyAccount';
import Address from '../Components/Layouts/Private/Account/Address/Address';
import Profile from '../Components/Layouts/Private/Account/Profile/Profile';
import Contact from '../Components/Layouts/Contact/Contact';
import About from '../Components/Layouts/About/About';
import Shop from '../Components/Layouts/Shop/Shop';
import SearchItem from '../Components/Layouts/Search/SearchItem';
import Order from '../Components/Layouts/Private/Order/Order';
import BuyNow from '../Components/Layouts/BuyNow/BuyNow';
import Browse from '../Views/Components/Browse Product/Browse';
import FAQs from '../Views/Components/QuickLinks/FAQs';
import PrivacyPolicy from '../Views/Components/QuickLinks/PrivacyPolicy';
import TermsOfUse from '../Views/Components/QuickLinks/TermsOfUse';

// eslint-disable-next-line import/prefer-default-export
export const PRIVATE_ROUTES: Array<CustomRouter> = [
  {
    path: ROUTES_CONFIG.ABOUT.path,
    element: <About />,
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
      { path: ROUTES_CONFIG.ADDRESS.path, element: <Address /> },
    ],
    title: ROUTES_CONFIG.ACCOUNT.title,
  },
  {
    path: ROUTES_CONFIG.CONTACT.path,
    element: <Contact />,
    title: ROUTES_CONFIG.CONTACT.title,
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
    path: ROUTES_CONFIG.ORDER.path,
    element: <Order />,
    title: ROUTES_CONFIG.ORDER.title,
  },
  {
    path: ROUTES_CONFIG.BUY.path,
    element: <BuyNow />,
    title: ROUTES_CONFIG.BUY.title,
  },
  {
    path: ROUTES_CONFIG.BROWSE.path,
    element: <Browse />,
    title: ROUTES_CONFIG.BROWSE.title,
  },
  {
    path: ROUTES_CONFIG.FAQs.path,
    element: <FAQs />,
    title: ROUTES_CONFIG.FAQs.title,
  },
  {
    path: ROUTES_CONFIG.PRIVACY_POLICY.path,
    element: <PrivacyPolicy />,
    title: ROUTES_CONFIG.PRIVACY_POLICY.title,
  },
  {
    path: ROUTES_CONFIG.TERMS_OF_USE.path,
    element: <TermsOfUse />,
    title: ROUTES_CONFIG.TERMS_OF_USE.title,
  },
];
