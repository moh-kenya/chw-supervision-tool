"use client";
import { useRouter } from 'next/navigation'
import { Menu, Layout, Modal, message } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import {
    HomeOutlined,
    UserOutlined,
    PlusCircleOutlined
} from '@ant-design/icons';
import Image from 'next/image';
import { Logo } from './Logo';
import { useEffect, useState, createContext } from 'react';
const { Header } = Layout;
import { v4 as uuidv4 } from 'uuid';


const NavBar = ({ setNotifs, id }) => {
    const ReachableContext = createContext<string | null>(null);
    const router = useRouter()
    const [width, setWidth] = useState(0);
    const [modal, contextHolder] = Modal.useModal();


    const handleLogout = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setNotifs({
                    type: 'success',
                    title: 'Success',
                    message: 'You are being logged out momentarily!',
                    toggle: true
                })
                setTimeout(() => {
                    router.push('/login');
                }, 2000);

            } else {
                const data = await response.json();
                setNotifs({
                    type: 'error',
                    title: 'Unable to log out',
                    message: data.message || 'An error occurred during logout',
                    toggle: true
                })
            }
        } catch (error) {
            console.error(error);
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

    const config = {
        title: 'Are you sure you want to logout?',
        content: 'Please confirm that you want to log out. If yes, Please click okay',
        okText: 'Yes, Logout',
        cancelText: 'No, Keep me logged in',
        onOk: () => handleLogout(),
        onCancel: () => message.info('Logout cancelled!')
    };
    const items2 = [{
        key: "hometopav-1",
        label: `Home`,
        onClick: () => { router.push('/dashboard'); }
    }, {
        key: "hometopav-2",
        label: `New Supervision`,
        onClick: () => { router.push(`/new-supervision/${id || uuidv4()}`); }
    },
    {
        key: "hometopav-3",
        label: `Users`,
        onClick: () => { router.push('/users'); }
    },
    {
        key: "hometopav-4",
        label: `Account`,
    },
    {
        key: "hometopav-5",
        label: `Logout`,
        onClick: () => {
            modal.confirm(config)
        }
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
            {contextHolder}
        </>)
}
export default NavBar;