import Header from '@/components/Header';

type props = {
  children: React.ReactNode;
};

const HomeLayout = ({ children }: props) => {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-0">{children}</main>
    </>
  );
};

export default HomeLayout;
