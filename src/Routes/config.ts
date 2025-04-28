import { RouteObject } from 'react-router-dom';
import { PRIVATE_ROUTES } from './PrivateRoutes';
import { PUBLIC_ROUTES } from './PublicRoutes';

export const guestRoutes = [...PUBLIC_ROUTES];

export const authenticatedRoutes: Array<RouteObject> = [
  /* ...PUBLIC_ROUTES, */ ...PRIVATE_ROUTES,
];
