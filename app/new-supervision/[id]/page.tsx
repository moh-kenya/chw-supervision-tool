'use client';

import React, { useContext, useEffect, useState } from 'react';
import { Button, message, Steps } from 'antd';
import { Client, Databases, ID } from 'node-appwrite';
import NavBar from '../../components/NavBar';
import { AppContext } from '../../providers';
import { type NotifsTypes } from '../../login/page';
import Notifications from '../../components/utils/Notifications';

const Home = ({ params }: { params: any }) => {
  const id = params?.id ?? '';

  const [notifs, setNotifs] = useState<NotifsTypes>({
    type: 'success',
    title: 'Success',
    message: 'You are being logged in momentarily!',
    toggle: false,
  });
  const [current, setCurrent] = useState(0);
  const store = useContext(AppContext);
  const modules = store?.modules ?? [];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const onChange = (value: number) => {
    setCurrent(value);
  };
  useEffect(() => {
    const dataRetrieved = retrieveData('chw-supervision');
    console.log(dataRetrieved[id]);
    if (!dataRetrieved[id]?.createdDate) {
      const data = {
        ...store?.globalState,
        createdDate: store?.globalState.createdDate || new Date(),
        updatedDate: new Date(),
        status: 'Draft',
      };
      dataRetrieved[id] = data;
      localStorage.setItem('chw-supervision', JSON.stringify(dataRetrieved));
      message.info(
        'New Supervision started and has been added to local drafts!'
      );
    } else {
      store?.setGlobalState((stored) => {
        const toStore = {
          ...dataRetrieved[id],
          ...stored,
        };
        dataRetrieved[id] = toStore;
        localStorage.setItem('chw-supervision', JSON.stringify(dataRetrieved));
        return dataRetrieved[id];
      });
    }
  }, [id, current]);

  const retrieveData = (id: string) => {
    const storedData = localStorage.getItem(id);
    if (storedData) {
      return JSON.parse(storedData);
    }
    return {};
  };
  const items = modules?.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const submitData = async () => {
    const dataRetrieved = retrieveData('chw-supervision');
    const response = await fetch('/api/auth/database', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataRetrieved[id]),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <Notifications {...notifs} />
      <NavBar setNotifs={setNotifs} id={id} />
      <div style={{ padding: '20px 48px', marginBottom: 80 }}>
        <Steps current={current} items={items} onChange={onChange} />
        <div>{modules?.[current]?.content}</div>
        <div style={{ marginTop: 24 }}>
          {current > 0 && (
            <Button
              style={{ margin: '0 8px' }}
              onClick={() => {
                prev();
              }}
            >
              Previous
            </Button>
          )}
          {current < modules?.length - 1 && (
            <Button
              type="primary"
              onClick={() => {
                next();
              }}
            >
              Next
            </Button>
          )}
          {current === modules?.length - 1 && (
            <Button type="primary" onClick={submitData}>
              Submit Data
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
export const runtime = 'edge';

export default Home;
