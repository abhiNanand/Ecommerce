import { AppLayoutProps } from '../AppLayout.d';
import Navbar from './Navbar';

function PublicLayout({ children }: Readonly<AppLayoutProps>): JSX.Element {
  return (
    <>
      <Navbar />
      {children}
      {/* <Footer /> */}
    </>
  );
}

export default PublicLayout;
