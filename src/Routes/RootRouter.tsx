import { useRoutes } from 'react-router-dom';
import DocumentTitle from './DocumentTitle';
import { authenticatedRoutes, guestRoutes } from './config';
import AppLayout from '../Components/Layouts/AppLayout';
import { useAuth } from '../Services/UserAuth';
import Admin from '../Views/Components/AdminPage/Admin';

function RootRouter() {
  const guest = useRoutes(guestRoutes);
  const authenticated = useRoutes(authenticatedRoutes);
  const { isAuthenticated, user, token } = useAuth();
  if (user?.email === 'abhishekanand7091@gmail.com') {
    return (
      <>
        {' '}
        <Admin />{' '}
      </>
    );
  }
  return (
    <>
      <DocumentTitle isAuthenticated={isAuthenticated} />
      <AppLayout isAuthenticated={isAuthenticated}>
        {token ? authenticated : guest}
      </AppLayout>
    </>
  );
}

export default RootRouter;
