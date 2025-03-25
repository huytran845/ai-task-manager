// Node Modules
import { Outlet } from 'react-router';

// Components
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const RootLayout = () => {
  return (
    <>
      <div className='min-h-[100dvh] flex flex-col overflow-hidden'>
        <Header />

        <main className='grow'>
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
