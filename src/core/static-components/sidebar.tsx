import { Layout, Menu, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';
import { TiHomeOutline } from 'react-icons/ti';
import { FiUsers, FiSettings } from 'react-icons/fi';
import { TbTemplate, TbEaseInOutControlPoints } from 'react-icons/tb';
import { MdSettingsCell } from 'react-icons/md';
import { VscDebugDisconnect } from 'react-icons/vsc';
import { ReactComponent as Logo } from '@/assets/images/iiko.svg';
import AppHandledButton from '@/components/display/button/handle-button';

import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
  FaUsersCog
} from 'react-icons/fa';
import { BiFile } from 'react-icons/bi';
import { BsLightningChargeFill } from 'react-icons/bs';
import { HiStatusOnline } from 'react-icons/hi';
import { AiOutlineTransaction } from 'react-icons/ai';
import { t } from 'i18next';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

interface ICurrentUserRoleName {
  currentUserRole: string;
}

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  permissionkey?: string[],
  permission?: string[] | string
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    permissionkey,
    permission
  } as MenuItem;
}

function Sidebar({ currentUserRole }: ICurrentUserRoleName) {
  const darkMode = useReadLocalStorage('darkTheme');
  const [collapsed, setCollapsed] = useLocalStorage('menuCollapse', false);
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState('');

  const filterSideItems = (items: any) => {
    let filteredItems;
    if (currentUserRole) {
      filteredItems = items?.filter((item: any) =>
        item.permissionkey.includes(currentUserRole)
      );
    }
    return filteredItems;
  };

  useEffect(() => {
    setSelectedItem(location.pathname);
  }, [location, collapsed]);

  const items: MenuItem[] = [
    getItem(
      <Link to="/home"> {t('home')} </Link>,
      '/home',
      <TiHomeOutline size={18} />,
      undefined,
      ['Moderator', 'Admin']
    ),

    getItem(
      <Link to="/moderator"> {t('moderator')} </Link>,
      '/moderator',
      <BiFile size={18} />,
      undefined,
      ['Admin']
    ),
    getItem(
      <Link to="/charge-point">{t('chargePoint')}</Link>,
      '/charge-point',
      <BsLightningChargeFill />,
      undefined,
      ['Moderator', 'Admin']
    ),
    getItem(
      <Link to="/connector-status">{t('connectorStatus')}</Link>,
      '/connector-status',
      <HiStatusOnline />,
      undefined,
      ['Moderator', 'Admin']
    ),
    getItem(
      <Link to="/transactions">{t('transactions')}</Link>,
      '/transactions',
      <AiOutlineTransaction />,
      undefined,
      ['Moderator', 'Admin']
    ),

    getItem(
      <Tooltip title={t('MobileAppUsers')}>{t('MobileAppUsers')}</Tooltip>,
      '/mobile-app-settings',
      <MdSettingsCell size={18} />,
      [
        getItem(
          <Tooltip title={t('MobileAppUsers')}>
            <Link to="/mobile-app-settings/users"> {t('MobileAppUsers')} </Link>
          </Tooltip>,
          '/mobile-app-settings/users',
          <FaUsersCog />,
          undefined,
          ['Moderator', 'Admin']
        )
      ],
      ['Moderator', 'Admin']
    ),
    getItem(
      <Tooltip title={t('settings')}>{t('settings')}</Tooltip>,
      '/settings',
      <FiSettings size={18} />,
      [
        getItem(
          <Tooltip title={t('legalEntities')}>
            <Link to="/settings/legal-entities"> {t('legalEntities')} </Link>
          </Tooltip>,
          '/settings/legal-entities',
          <FiUsers />,
          undefined,
          ['Moderator', 'Admin']
        ),
        getItem(
          <Tooltip title={t('founders')}>
            <Link to="/settings/founders">{t('founders')}</Link>
          </Tooltip>,
          '/settings/founders',
          <TbTemplate />,
          undefined,
          ['Moderator', 'Admin']
        ),

        getItem(
          <Tooltip title={t('chargePointConfigs')}>
            <Link to="/settings/charge-point-configurations">
              {t('chargePointConfigs')}
            </Link>
          </Tooltip>,
          '/settings/charge-point-configurations',
          <TbEaseInOutControlPoints />,
          undefined,
          ['Moderator', 'Admin']
        ),
        getItem(
          <Tooltip title={t('connectorTypes')}>
            <Link to="/settings/connector-types">{t('connectorTypes')}</Link>
          </Tooltip>,
          '/settings/connector-types',
          <VscDebugDisconnect />,
          undefined,
          ['Moderator', 'Admin']
        )
      ],
      ['Moderator', 'Admin']
    )
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        backgroundColor: !darkMode ? '#fff' : '#141414'
      }}
    >
      <div className="flex flex-col justify-between h-full py-2">
        <div>
          <div
            style={{
              width: '100%',
              height: 70,
              padding: 15,
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: darkMode ? '#141414' : '#fff'
            }}
          >
            {collapsed ? (
              <Link to="/home">
                <Logo height={'85%'} />
              </Link>
            ) : (
              <Link to="/home">
                <Logo height={'135%'} />
              </Link>
            )}
            <AppHandledButton
              icon={
                collapsed ? (
                  <FaRegArrowAltCircleRight size={20} />
                ) : (
                  <FaRegArrowAltCircleLeft size={20} />
                )
              }
              onClick={() => setCollapsed(!collapsed)}
              style={{
                border: 'none',
                position: 'absolute',
                top: 20,
                zIndex: 999,
                left: collapsed ? 60 : 180,
                fontSize: '16px',
                width: 40,
                height: 40,
                borderRadius: '50%',
                color: '#454562',
                boxShadow: 'rgba(0, 0, 0, 0.35) 0 5px 15px'
              }}
              className="center"
            />
          </div>
          {currentUserRole && items && (
            <Menu
              defaultSelectedKeys={[location.pathname]}
              openKeys={openKeys}
              onOpenChange={keys => {
                setOpenKeys(keys);
              }}
              selectedKeys={[selectedItem]}
              onSelect={({ key }) => {
                setSelectedItem(key);
              }}
              items={filterSideItems(items)}
              mode="inline"
            />
          )}
        </div>
      </div>
    </Sider>
  );
}

export default Sidebar;
