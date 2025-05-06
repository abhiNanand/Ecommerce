import { ROUTES_CONFIG } from '../Shared/Constants';
import { CustomRouter } from './RootRoutes';
import { SHARED_ROUTES } from './SharedRoutes';

import Login from '../Views/Auth/Login/Login';
import Signup from '../Views/Auth/Signup';
// eslint-disable-next-line import/prefer-default-export
export const PUBLIC_ROUTES: Array<CustomRouter> = [
  ...SHARED_ROUTES,
  {
    path: `${ROUTES_CONFIG.LOGIN.path}`,
    title: ROUTES_CONFIG.LOGIN.title,
    element: <Login />,
  },
  {
    path: `${ROUTES_CONFIG.SIGNUP.path}`,
    element: <Signup />,
    title: ROUTES_CONFIG.SIGNUP.title,
  },
];
