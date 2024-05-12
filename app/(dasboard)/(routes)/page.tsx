import Navbar from '@/components/Navbar';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Navbar />
      <h1>Home</h1>
      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
    </div>
  );
}
