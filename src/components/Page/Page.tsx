import { Outlet, useParams } from 'react-router-dom';

const Page = () => {
  const { zaaktype, attribuut } = useParams();
  const title = attribuut || zaaktype;

  return (
    <main className="p-3 md:px-5">
      {!title ? (
        <h1 className="text-5xl text-800">Dashboard</h1>
      ) : (
        <h2 className="text-4xl text-800">{title}</h2>
      )}
      <Outlet />
    </main>
  );
};

export default Page;
