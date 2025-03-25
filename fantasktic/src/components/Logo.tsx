// Assets
import { logo } from '@/assets';

const Logo = () => {
  return (
    <div className='flex items-center gap-3 font-semibold text-lg'>
      <img
        src={logo}
        alt='Fantasktic Logo'
        className='w-6 h-6'
      />
      Fantasktic
    </div>
  );
};

export default Logo;
