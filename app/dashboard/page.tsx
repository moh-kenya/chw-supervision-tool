'use client';

import { Alert, message, Modal, Space, Table, Tag, Typography } from 'antd';
import { useEffect, useState } from 'react';
import type { TableProps } from 'antd';
import { useRouter } from 'next/navigation';
import { type NotifsTypes } from '../login/page';
import Notifications from '../components/utils/Notifications';
import NavBar from '../components/NavBar';

const { Title } = Typography;

export default function Home() {
  const router = useRouter();
  const [drafts, setDrafts] = useState<any>({});
  const [keys, setKeys] = useState<any>([]);
  const [modalData, setModalData] = useState<any>({
    title: '',
    message: '',
    action: () => {},
    isOpen: false,
  });

  const [notifs, setNotifs] = useState<NotifsTypes>({
    type: 'success',
    title: 'Success',
    message: 'You are being logged in momentarily!',
    toggle: false,
  });
  useEffect(() => {
    const data = retrieveData();
    setDrafts(data);
    setKeys(Object.keys(data));
  }, []);
  const retrieveData = () => {
    const storedData = localStorage.getItem('chw-supervision');
    if (storedData) {
      return JSON.parse(storedData);
    }
    return {};
  };
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Submission ID',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Date Created',
      key: 'tags',
      render: (text) => (
        <>{new Date(drafts[text]?.createdDate)?.toLocaleString()}</>
      ),
    },
    {
      title: 'Date Updated',
      key: 'tags',
      render: (text) => (
        <>{new Date(drafts[text]?.updatedDate)?.toLocaleString()}</>
      ),
    },
    {
      title: 'Status',
      key: 'tags',
      render: (text) => (
        <Tag color={drafts[text].status === 'Draft' ? 'blue' : 'green'}>
          {drafts[text].status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text) => (
        <Space size="middle">
          <a
            onClick={() => {
              handleResume(text);
            }}
          >
            Resume
          </a>
          <a
            onClick={() => {
              handleSubmit(text);
            }}
          >
            Submit Draft
          </a>
          <a
            onClick={() => {
              handleDelete(text);
            }}
          >
            Delete Draft
          </a>
        </Space>
      ),
    },
  ];

  const handleResume = (id: string) => {
    setModalData({
      title: 'Are you sure you want to continue with this draft?',
      message:
        'This will load the saved data on this device to allow you to proceeed with supervision',
      action: () => {
        router.push(`/new-supervision/${id}`);
      },
      isOpen: true,
    });
  };
  const handleSubmit = (id: string) => {
    setModalData({
      title: 'Are you sure you want to submit this supervision?',
      message:
        'This will submit the data and will not be modifiable after submission. Make sure the form is filled to your satisfaction before submitting.',
      action: () =>
        message.success(`Successfully Submitted supervision with id: ${id}`),
      isOpen: true,
    });
  };
  const handleDelete = (id: string) => {
    setModalData({
      title: 'Are you sure you want to delete this supervision draft?',
      message:
        'This action is not reversable and will delete this supervision. Please take caution when clicking Okay.',
      action: () =>
        message.success(
          `Successfully deleted supervision draft with id: ${id}`
        ),
      isOpen: true,
    });
  };
  const handleCancel = () => {
    setModalData({
      title: '',
      message: '',
      action: () => {},
      isOpen: false,
    });
  };
  return (
    <>
      <Notifications {...notifs} />
      <NavBar setNotifs={setNotifs} id="" />
      <div style={{ padding: '20px 48px', marginBottom: 80 }}>
        <Title level={3} style={{ marginBottom: 20 }}>
          Supervision Submissions
        </Title>
        {Object.keys(drafts).length <= 0 ? (
          <Alert
            message="No Drafts or Submitted data available."
            description="Submit a new supervision or save to drafts to view any a supervision assessment"
            type="info"
            showIcon
          />
        ) : (
          <Table
            columns={columns}
            loading={Object.keys(keys).length <= 0}
            dataSource={keys}
            scroll={{ x: 'max-content' }}
          />
        )}
      </div>
      <Modal
        title={modalData.title}
        open={modalData.isOpen}
        onOk={modalData.action}
        onCancel={handleCancel}
      >
        <p>{modalData.message}</p>
      </Modal>
    </>
  );
}
