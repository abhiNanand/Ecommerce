import { ROUTES_CONFIG } from '../Shared/Constants';
import Dashboard from '../Views/Dashboard/Dashboard';
import { CustomRouter } from './RootRoutes';

// making changes;
import Category from '../Views/Components/Categories/Category';
import Login from '../Views/Auth/Login/Login';
import Signup from '../Views/Auth/Signup';
import ProductDetails from '../Views/Components/ProductDetails/ProductDetails';
import Error404 from '../Views/Components/ErrorPage/Error';
import Contact from '../Views/Components/Contact/Contact';
import About from '../Views/Components/About/About';
import Shop from '../Views/Components/Shop/Shop';
import SearchItem from '../Components/Layouts/Search/SearchItem';
import ComingSoon from '../Views/Components/ComingSoon/ComingSoon';
import FAQs from '../Views/Components/QuickLinks/FAQs';
import PrivacyPolicy from '../Views/Components/QuickLinks/PrivacyPolicy';
import TermsOfUse from '../Views/Components/QuickLinks/TermsOfUse';

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
    element: <Error404 />,
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
    element: <ComingSoon />,
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
