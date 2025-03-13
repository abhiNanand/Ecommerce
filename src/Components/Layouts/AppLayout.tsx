import PrivateLayout from './Private/PrivateLayout';
import PublicLayout from './Public/PublicLayout';
import { AppLayoutProps } from './AppLayout.d';

import TopHeader from './TopHeader/TopHeader.tsx';
import Footer from './Footer/Footer.tsx';
function AppLayout({ isAuthenticated, children }: AppLayoutProps) {
  return(
    <>
    <TopHeader/>
    {isAuthenticated ? (
    <PrivateLayout>{children}</PrivateLayout>
  ) : (
    <PublicLayout>{children}</PublicLayout>
  )}
  <Footer/>
    </>
  ); 
}

export default AppLayout;
