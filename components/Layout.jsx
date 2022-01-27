import Head from 'next/head';
import Toolbar from './Toolbar';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Next News App</title>
      </Head>
      <div className="page-container">
        <Toolbar />
        {children}
      </div>
    </>
  );
};

export default Layout;
