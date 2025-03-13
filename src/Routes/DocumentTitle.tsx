import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { Path, pathToRegexp } from 'path-to-regexp';

import AUTH_ROUTES from './AuthRoutes';
import { PRIVATE_ROUTES } from './PrivateRoutes';
import { PUBLIC_ROUTES } from './PublicRoutes';
import { CustomRouter } from './RootRoutes';

// eslint-disable-next-line react/prop-types
function DocumentTitle({ isAuthenticated = false }) {
  const location = useLocation();
  const ROUTES: CustomRouter[] = PUBLIC_ROUTES.concat(
    isAuthenticated ? PRIVATE_ROUTES : AUTH_ROUTES
  );
  const matchedRoute: CustomRouter | undefined = ROUTES.find(
    (route: CustomRouter) =>
      route.path !== '*' &&
      pathToRegexp(route.path as Path).test(location.pathname)
  );

  const title = matchedRoute ? matchedRoute.title : '';
  return (
    <Helmet>
      <title>{title}</title>
      <meta />
    </Helmet>
  );
}

export default DocumentTitle;
