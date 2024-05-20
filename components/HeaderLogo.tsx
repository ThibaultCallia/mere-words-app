import Image from 'next/image';
import Link from 'next/link';

const HeaderLogo = () => {
  return (
    <Link href={'/'}>
      <div className="flex items-center gap-6">
        <Image
          className="hidden lg:flex"
          src="/rabb.svg"
          alt="Rabbit Hole Logo"
          height={64}
          width={64}
        />
        <Image
          className="flex lg:hidden"
          src="/rabb.svg"
          alt="Rabbit Hole Logo"
          height={28}
          width={28}
        />
      </div>
    </Link>
  );
};

export default HeaderLogo;
