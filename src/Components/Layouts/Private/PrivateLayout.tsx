import { AppLayoutProps } from '../AppLayout.d';
import Navbar from '../Public/Navbar';

function PrivateLayout({ children }: AppLayoutProps): JSX.Element {
  return (
    <>
      <Navbar />
      {children}
      {/* <Footer /> */}
    </>
  );
}

export default PrivateLayout;
