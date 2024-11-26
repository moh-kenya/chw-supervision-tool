
'use client';
import NavBar from '../components/NavBar';
import { Alert, Space, Table, Tag } from 'antd';
import Notifications from '../components/utils/Notifications';
import { useEffect, useState } from 'react';
import { NotifsTypes } from '../login/page';
import type { TableProps } from 'antd';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

export default function Home() {

  const [drafts, setDrafts] = useState({});
  const [keys, setKeys] = useState([]);

  const [notifs, setNotifs] = useState<NotifsTypes>({
    type: 'success',
    title: 'Success',
    message: 'You are being logged in momentarily!',
    toggle: false
  })
  useEffect(() => {
    const data = retrieveData();
    setDrafts(data)
    setKeys(Object.keys(data))
  }, [])
  const retrieveData = () => {
    const storedData = localStorage.getItem("chw-supervision");
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      return {};
    }
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
      render: (text) => <>{new Date(drafts[text]?.createdDate)?.toLocaleString()}</>,
    },
    {
      title: 'Date Updated',
      key: 'tags',
      render: (text) => <>{new Date(drafts[text]?.updatedDate)?.toLocaleString()}</>,
    },
    {
      title: 'Status',
      key: 'tags',
      render: () => (
        <Tag color={'blue'}>
          Draft
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <a>Resume</a>
          <a>Submit Draft</a>
          <a>Delete Draft</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Notifications {...notifs} />
      <NavBar setNotifs={setNotifs} id={""} />
      <div style={{ padding: '20px 48px', marginBottom: 80 }}>
        {Object.keys(drafts).length <= 0 ?
          <Alert
            message="No Drafts or Submitted data available."
            description="Submit a new supervision or save to drafts to view any a supervision assessment"
            type="info"
            showIcon
          /> :
          <Table columns={columns} dataSource={keys} />}
      </div>
    </>
  );
}