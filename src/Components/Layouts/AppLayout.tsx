import PrivateLayout from './Private/PrivateLayout';
import PublicLayout from './Public/PublicLayout';
import { AppLayoutProps } from './AppLayout.d';

import TopHeader from './TopHeader/TopHeader';
import Footer from './Footer/Footer';
import Header from './Header/Header';

function AppLayout({ isAuthenticated, children }: Readonly<AppLayoutProps>) {
  return (
    <>
      <TopHeader />
      <Header />
      {isAuthenticated ? (
        <PrivateLayout>{children}</PrivateLayout>
      ) : (
        <PublicLayout>{children}</PublicLayout>
      )}
      <Footer />
    </>
  );
}

export default AppLayout;
