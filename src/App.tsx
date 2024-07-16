/* eslint-disable no-unused-vars */
import { useNavigate, useRoutes } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import { Suspense, useEffect } from 'react';
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';
import routesList from '@/core/routes/routes';
import { useDispatch } from 'react-redux';
import SuspenseLoader from './core/static-components/suspense_loader';
import { themeConfig } from './configs/global-configs';
import {
  AuthService,
  IAuthResponse
} from './services/auth-services/auth-services';
import { setUser } from './redux/auth/auth_slice';
import { IUserToken } from './models/common';

function App() {
  const router = useRoutes(routesList);
  const { defaultAlgorithm, darkAlgorithm } = theme;

  // eslint-disable-next-line no-unused-vars
  const [isDarkTheme, setDarkTheme] = useLocalStorage('darkTheme', false);
  const userTokenData: IUserToken | null = useReadLocalStorage('userToken');
  const darkMode = useReadLocalStorage('darkTheme');
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const res: IAuthResponse = await AuthService.getInstance().getUserData();
      dispatch(setUser(res?.Data));
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const hasToken = !!userTokenData?.token;

    if (!hasToken && window.location.pathname !== '/login') {
      navigate('/login');
    } else if (hasToken && window.location.pathname === '/') {
      navigate('/home');
    }
    if (darkMode === null) {
      setDarkTheme(false);
    }
  }, [userTokenData?.token, navigate]);

  useEffect(() => {
    if (userTokenData?.token) {
      getUser();
    }
  }, [userTokenData?.token]);

  return (
    <ConfigProvider
      theme={themeConfig(darkMode, darkAlgorithm, defaultAlgorithm)}
    >
      <Suspense fallback={<SuspenseLoader />}>{router}</Suspense>
    </ConfigProvider>
  );
}

export default App;
