import Header from '@/components/Header';

type props = {
  children: React.ReactNode;
};

const HomeLayout = ({ children }: props) => {
  return (
    <>
      <Header />
      <main className="">{children}</main>
    </>
  );
};

export default HomeLayout;
