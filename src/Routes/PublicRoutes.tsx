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
import Browse from '../Views/Browse Product/Browse';
import FAQs from '../Views/QuickLinks/FAQs';
import PrivacyPolicy from '../Views/QuickLinks/PrivacyPolicy';
import TermsOfUse from '../Views/QuickLinks/TermsOfUse';

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
