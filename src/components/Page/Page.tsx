import { Outlet, useParams } from 'react-router-dom';

const Page = () => {
  const { zaaktype, attribuut } = useParams();
  const title = attribuut || zaaktype;

  return (
    <main>
      {!title ? <h1>Dashboard</h1> : <h2>{title}</h2>}
      <Outlet />
    </main>
  );
};

export default Page;
