'use client';

import { Typography } from 'antd';
import { useState } from 'react';
import { type NotifsTypes } from '../login/page';
import Notifications from '../components/utils/Notifications';
import NavBar from '../components/NavBar';
import SubmissionsTable from '../components/SubmissionsTable';

const { Title } = Typography;

export default function Home() {
  const [notifs, setNotifs] = useState<NotifsTypes>({
    type: 'success',
    title: 'Success',
    message: '',
    toggle: false,
  });
  return (
    <main className="min-h-screen">
      <NavBar setNotifs={setNotifs} />
      <div style={{ padding: '24px' }}>
        <Title level={2}>Supervision Forms Dashboard</Title>
        <SubmissionsTable />
      </div>
      <Notifications
        type={notifs.type}
        title={notifs.title}
        message={notifs.message}
        toggle={notifs.toggle}
      />
    </main>
  );
}
