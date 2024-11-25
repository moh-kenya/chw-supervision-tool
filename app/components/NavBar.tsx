"use client";
import { useRouter } from 'next/navigation'
import { Menu, Layout } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import {
    HomeOutlined,
    UserOutlined,
    PlusCircleOutlined
} from '@ant-design/icons';
import Image from 'next/image';
import { Logo } from './Logo';
import { useEffect, useState } from 'react';
const { Header } = Layout;

const NavBar = () => {
    const [width, setWidth] = useState(0);
    const [error, setError] = useState(null);

    const handleLogout = async () => {
        setError(null);
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Redirect to login page after logout
                router.push('/login');
            } else {
                const data = await response.json();
                setError(data.message || 'An error occurred during logout');
            }
        } catch (error) {
            console.error(error);
            setError('An unexpected error occurred during logout');
        } finally {

        }
    };

    useEffect(() => {
        if (window !== undefined) {
            setWidth(window && window.innerWidth);
            const handleResize = () => setWidth(window.innerWidth);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);
    const router = useRouter();
    const items2 = [{
        key: "hometopav-1",
        label: `Home`,
        onClick: () => { router.push('/dashboard'); }
    }, {
        key: "hometopav-2",
        label: `New Supervision`,
        onClick: () => { router.push('/new-supervision'); }
    }, {
        key: "hometopav-3",
        label: `Account`,
    },
    {
        key: "hometopav-4",
        label: `Logout`,
        onClick: () => handleLogout()
    }
    ]
    const NavigateToPage = (key: string) => {
        switch (key) {
            case "1": router.push("/dashboard"); break;
            case "2": router.push("/new-supervision"); break;
            default: return;
        }
    }

    // useEffect(() => {
    //     const checkAuth = async () => {
    //         try {
    //             await account.get();
    //         } catch (error) {
    //             console.log(error)
    //             router.push('/'); // If not authenticated, redirect to login
    //         }
    //     };
    //     checkAuth();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
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
                    padding: "0 48px"
                }}
            >
                <Image alt={"logo"} height={50} width={187} src={Logo} />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={width > 600 ? items2 : []}
                    style={{ flex: 1, minWidth: 0 }}
                />
            </Header>
            <div className="navbar">
                <Menu mode="horizontal" theme="dark" className='bottombar' onClick={(item) => NavigateToPage(item.key)}>
                    <MenuItem key="1"><HomeOutlined className='menu-icons' /></MenuItem>
                    <MenuItem key="2"><PlusCircleOutlined className='menu-icons' /></MenuItem>
                    <MenuItem key="3"><UserOutlined className='menu-icons' /></MenuItem>
                </Menu>
            </div>
        </>)
}
export default NavBar;