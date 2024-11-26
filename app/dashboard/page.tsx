
'use client';
import NavBar from '../components/NavBar';
import { Alert } from 'antd';
import Notifications from '../components/utils/Notifications';
import { useState } from 'react';
import { NotifsTypes } from '../login/page';
export default function Home() {

  const [notifs, setNotifs] = useState<NotifsTypes>({
    type: 'success',
    title: 'Success',
    message: 'You are being logged in momentarily!',
    toggle: false
  })

  return (
    <>
      <Notifications {...notifs} />
      <NavBar setNotifs={setNotifs} />
      <div style={{ padding: '20px 48px', marginBottom: 80 }}>
        <Alert
          message="No Drafts or Submitted data available."
          description="Submit a new supervision or save to drafts to view any a supervision assessment"
          type="info"
          showIcon
        />
      </div>
    </>
  );
}