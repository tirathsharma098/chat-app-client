import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';
import AppHeader from '../components/header/AppHeader';
import { useEffect } from 'react';
import { getTokenDuration } from '../utils/auth';
import style from './Root.module.css';
const RootLayout = (props) => {
  const token = useLoaderData();
  const submit = useSubmit();
  useEffect(() => {
    if (!token) {
      return;
    }
    if (token === 'EXPIRED') {
      submit(null, { action: '/logout', method: 'post' });
      return;
    }
    const tokenDuration = getTokenDuration();
    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, tokenDuration);
  }, [token, submit]);
  return (
    <div style={{ height: '100%' }}>
      <div style={{ height: '100%' }} className="wrapper bg-light">
        <AppHeader />
        <div className={`${style.body}`}>
          <Outlet />
        </div>
        {/* <AppFooter /> */}
      </div>
    </div>
  );
};
export default RootLayout;
