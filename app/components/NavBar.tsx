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
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const router = useRouter();
    const items2 = [{
        key: "hometopav-1",
        label: `Home`,
        onClick: () => { router.push('/'); }
    }, {
        key: "hometopav-2",
        label: `New Supervision`,
        onClick: () => { router.push('/new-supervision'); }
    }, {
        key: "hometopav-3",
        label: `Account`,
    }]
    const NavigateToPage = (key: string) => {
        switch (key) {
            case "1": router.push("/"); break;
            case "2": router.push("/new-supervision"); break;
            default: return;
        }
    }
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