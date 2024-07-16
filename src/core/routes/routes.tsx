import FallbackSpinner from '@/components/display/FallbackSpinner/fallback-spinner';
import { Navigate } from 'react-router-dom';

import React, { Suspense } from 'react';
import Founders from '@/modules/settings/founders/components/founders';
import ChargePoint from '@/modules/charge-point/components/charge-point';
import ConnectorStatus from '@/modules/connector-status/components/connector-status';
import Transactions from '@/modules/transactions/components/transactions';
import ChargePointConfigs from '@/modules/settings/charge-point-configs/components/charge-point-configs';
import ConnectorTypes from '@/modules/settings/connector-type/components/connector-types';
// import MobileUsers from '@/modules/mobile-users/components/mobile-users';
// import ChangePassword from '../static-components/change-password';

const LoginPage = React.lazy(() => import('@/core/static-pages/login_page'));
const RegisterPage = React.lazy(
  () => import('@/core/static-pages/register_page')
);
const HomePage = React.lazy(() => import('@/modules/home/pages/index'));
const LayoutPage = React.lazy(() => import('@core/layout/layout'));

const PersonalCabinetPage = React.lazy(
  () => import('@/modules/personal-cabinet/components/personal-cabinet')
);
const ModeratorPage = React.lazy(
  () => import('@/modules/moderator/components/moderator')
);

const LegalEntitiesPage = React.lazy(
  () => import('@/modules/settings/legal-entities/pages')
);

const MobileAppUsersPage = React.lazy(
  () => import('@/modules/mobile-app-settings/mobile-app-users/pages')
);

const routes = [
  {
    path: '/',
    element: (
      <Suspense fallback={<FallbackSpinner />}>
        <LayoutPage />
      </Suspense>
    ),
    children: [
      {
        path: '/home',
        index: true,
        element: (
          <Suspense fallback={<FallbackSpinner />}>
            <HomePage />
          </Suspense>
        )
      },
      {
        path: '/personal-cabinet',
        index: true,
        element: (
          <Suspense fallback={<FallbackSpinner />}>
            <PersonalCabinetPage />
          </Suspense>
        )
      },
      {
        path: 'settings/founders',
        element: (
          <Suspense fallback={<FallbackSpinner />}>
            <Founders />
          </Suspense>
        )
      },
      {
        path: '/moderator',
        element: (
          <Suspense fallback={<FallbackSpinner />}>
            <ModeratorPage />
          </Suspense>
        )
      },
      {
        path: 'settings/legal-entities',
        element: (
          <Suspense fallback={<FallbackSpinner />}>
            <LegalEntitiesPage />
          </Suspense>
        )
      },
      {
        path: 'settings/charge-point-configurations',
        element: (
          <Suspense fallback={<FallbackSpinner />}>
            <ChargePointConfigs />
          </Suspense>
        )
      },
      {
        path: 'settings/connector-types',
        element: (
          <Suspense fallback={<FallbackSpinner />}>
            <ConnectorTypes />
          </Suspense>
        )
      },
      {
        path: '/charge-point',
        element: (
          <Suspense fallback={<FallbackSpinner />}>
            <ChargePoint />
          </Suspense>
        )
      },
      {
        path: '/transactions',
        element: (
          <Suspense fallback={<FallbackSpinner />}>
            <Transactions />
          </Suspense>
        )
      },
      {
        path: '/connector-status',
        element: (
          <Suspense fallback={<FallbackSpinner />}>
            <ConnectorStatus />
          </Suspense>
        )
      },
      // {
      //   path: '/entities',
      //   children: [
      //     { path: '/entities', element: <Navigate to="legal-entities" /> },
      //     {
      //       path: 'legal-entities',
      //       key: 'legal-entities',
      //       index: true,
      //       element: (
      //         <Suspense fallback={<FallbackSpinner />}>
      //           <LegalEntitiesPage />
      //         </Suspense>
      //       )
      //     }
      //   ]
      // },
      {
        path: '/mobile-app-settings/users',
        element: (
          <Suspense fallback={<FallbackSpinner />}>
            <MobileAppUsersPage />
          </Suspense>
        )
      },

      {
        path: 'no-permission',
        element: <h1>no permission</h1>
      },
      {
        path: '404',
        element: <h1>404</h1>
      }
    ]
  },
  {
    path: 'login',
    element: <LoginPage />
  },
  {
    path: 'register',
    element: <RegisterPage />
  },
  {
    path: '*',
    element: <Navigate to="/404" />
  }
  // {
  //   path: 'change-password',
  //   element: <ChangePassword />
  // }
];

export default routes;
