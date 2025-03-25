// Node Modules
import { Link } from 'react-router';

// Components
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className='fixed top-0 left-0 w-full p-4'>
      <div className='container h-16 border backdrop-blur-3xl rounded-xl flex justify-between items-center'>
        <Link to='/'>
          <Logo />
        </Link>

        <div className='flex items-center gap-2'>
          <Button
            asChild
            variant='ghost'
          >
            <Link to='/login'>Login</Link>
          </Button>

          <Button asChild>
            <Link to='/register'>Try for free!</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
