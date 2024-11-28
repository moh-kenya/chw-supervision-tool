
'use client';
import NavBar from '../components/NavBar';
import { message, Modal, Space, Table, Typography } from 'antd';
import Notifications from '../components/utils/Notifications';
import { useEffect, useState } from 'react';
import { NotifsTypes } from '../login/page';
import type { TableProps } from 'antd';
import { useRouter } from "next/navigation";
import { EditOutlined, KeyOutlined, StopOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}


export default function Home() {
    const router = useRouter();
    const [data, setData] = useState<any>([]);
    const [modalData, setModalData] = useState<any>({
        title: '',
        message: '',
        action: () => { },
        isOpen: false
    })

    const [notifs, setNotifs] = useState<NotifsTypes>({
        type: 'success',
        title: 'Success',
        message: 'You are being logged in momentarily!',
        toggle: false
    })
    useEffect(() => {
        fetch('/api/auth/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            response.json().then((data) => {
                setData(data.users)
            })

        })


    }, [])
    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name'
        },
        {
            title: 'Email',
            key: 'name',
            dataIndex: 'email'
        },
        {
            title: 'Phone',
            key: 'Phone',
            dataIndex: 'phone'
        },
        {
            title: 'Date Created',
            key: 'Date Created',
            render: (text) => <>{new Date(text.registration)?.toLocaleString()}</>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text) => (
                <Space size="middle">
                    <a onClick={() => { handleResume(text) }}> <StopOutlined className='user-menu-icons' />Suspend</a>
                    <a onClick={() => { handleSubmit(text) }}><KeyOutlined className='user-menu-icons' />Change Password</a>
                    <a onClick={() => { handleDelete(text) }}><EditOutlined className='user-menu-icons' />Edit</a>
                </Space>
            ),
        },
    ];

    const handleResume = (id: string) => {
        setModalData({
            title: 'Are you sure you want to continue with this draft?',
            message: 'This will load the saved data on this device to allow you to proceeed with supervision',
            action: () => router.push(`/new-supervision/i${id}`),
            isOpen: true
        })
    }
    const handleSubmit = (id: string) => {
        setModalData({
            title: 'Are you sure you want to submit this supervision?',
            message: 'This will submit the data and will not be modifiable after submission. Make sure the form is filled to your satisfaction before submitting.',
            action: () => message.success(`Successfully Submitted supervision with id: ${id}`),
            isOpen: true
        })
    }
    const handleDelete = (id: string) => {
        setModalData({
            title: 'Are you sure you want to delete this supervision draft?',
            message: 'This action is not reversable and will delete this supervision. Please take caution when clicking Okay.',
            action: () => message.success(`Successfully deleted supervision draft with id: ${id}`),
            isOpen: true
        })
    }
    const handleCancel = () => {
        setModalData({
            title: '',
            message: '',
            action: () => { },
            isOpen: false
        });
    };
    return (
        <>
            <Notifications {...notifs} />
            <NavBar setNotifs={setNotifs} id={""} />
            <div style={{ padding: '20px 48px', marginBottom: 80 }}>
                <Title level={2} style={{ marginBottom: 20 }}>User Management</Title>
                <Table columns={columns} dataSource={data} loading={Object.keys(data).length <= 0} />
            </div>
            <Modal title={modalData.title} open={modalData.isOpen} onOk={modalData.action} onCancel={handleCancel}>
                <p>{modalData.message}</p>
            </Modal>
        </>
    );
}