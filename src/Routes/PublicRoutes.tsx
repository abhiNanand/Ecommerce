 
import { ROUTES_CONFIG } from '../Shared/Constants';
import Dashboard from '../Views/Dashboard/Dashboard';
import { CustomRouter } from './RootRoutes';

// making changes;
import Login from '../Views/Auth/Login/Login';
import Signup from '../Views/Auth/Signup';
import ProductDetails from '../Components/Layouts/ProductDetails/ProductDetails';
import Error from '../Components/Layouts/ErrorPage/Error';
 
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
    element: <Error/>,
    title: ROUTES_CONFIG.WILDCARD.title,
  },
  {
    path: `${ROUTES_CONFIG.SIGNUP.path}`,
    element: <Signup />,
    title: ROUTES_CONFIG.SIGNUP.title,
  },
  {
    path:ROUTES_CONFIG.PRODUCT_DETAILS.path,
    element:<ProductDetails/>,
    title:ROUTES_CONFIG.PRODUCT_DETAILS.title,
  },
];
