'use client';

import { useRouter } from 'next/navigation';
import { Menu, Layout, Modal, message } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import {
  HomeOutlined,
  UserOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Client, Account } from 'appwrite';
import { Logo } from './Logo';
import environments from '../utils/environments';

const { Header } = Layout;
const { APP_ENDPOINT, APP_PROJECT } = environments;

// Initialize Appwrite
const client = new Client()
  .setEndpoint(APP_ENDPOINT)
  .setProject(APP_PROJECT);

const account = new Account(client);

const NavBar = ({ setNotifs, id }: any) => {
  const router = useRouter();
  const [width, setWidth] = useState(0);
  const [modal, contextHolder] = Modal.useModal();

  const handleLogout = async () => {
    try {
      // Delete the current session
      await account.deleteSession('current');

      setNotifs({
        type: 'success',
        title: 'Success',
        message: 'You are being logged out momentarily!',
        toggle: true,
      });

      // Add a small delay before redirect to show the success message
      setTimeout(() => {
        router.push('/login');
      }, 1500);

    } catch (error) {
      console.error('Logout error:', error);
      setNotifs({
        type: 'error',
        title: 'Unable to log out',
        message: error instanceof Error ? error.message : 'An error occurred during logout',
        toggle: true,
      });
    }
  };

  useEffect(() => {
    if (window !== undefined) {
      setWidth(window && window.innerWidth);
      const handleResize = () => {
        setWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const config = {
    title: 'Are you sure you want to logout?',
    content:
      'Please confirm that you want to log out. If yes, Please click okay',
    okText: 'Yes, Logout',
    cancelText: 'No, Keep me logged in',
    onOk: async () => {
      await handleLogout();
    },
    onCancel: () => message.info('Logout cancelled!'),
  };
  const items2 = [
    {
      key: 'hometopav-1',
      label: `Home`,
      onClick: () => {
        router.push('/dashboard');
      },
    },
    {
      key: 'hometopav-2',
      label: `New Supervision`,
      onClick: () => {
        router.push(`/new-supervision/${id || uuidv4()}`);
      },
    },
    {
      key: 'hometopav-3',
      label: `Users`,
      onClick: () => {
        router.push('/users');
      },
    },
    {
      key: 'hometopav-4',
      label: `Account`,
    },
    {
      key: 'hometopav-5',
      label: `Logout`,
      onClick: () => {
        modal.confirm(config);
      },
    },
  ];
  const NavigateToPage = (key: string) => {
    switch (key) {
      case '1':
        router.push('/dashboard');
        break;
      case '2':
        router.push(`/new-supervision/${id || uuidv4()}`);
        break;
      default:
    }
  };
  return (
    <>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 48px',
        }}
      >
        <Image alt="logo" height={50} width={187} src={Logo} />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={width > 600 ? items2 : []}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <div className="navbar">
        <Menu
          mode="horizontal"
          theme="dark"
          className="bottombar"
          onClick={(item) => {
            NavigateToPage(item.key);
          }}
        >
          <MenuItem key="1">
            <HomeOutlined className="menu-icons" />
          </MenuItem>
          <MenuItem key="2">
            <PlusCircleOutlined className="menu-icons" />
          </MenuItem>
          <MenuItem key="3">
            <UserOutlined className="menu-icons" />
          </MenuItem>
        </Menu>
      </div>
      {contextHolder}
    </>
  );
};
export default NavBar;
