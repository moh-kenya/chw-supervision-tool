"use client"
import React, { useContext, useEffect, useState } from 'react';
import { Button, message, Steps } from 'antd';
import NavBar from '../../components/NavBar';
import { AppContext } from '../../providers';
import { NotifsTypes } from '../../login/page';
import Notifications from '../../components/utils/Notifications';
export default function Home({ params }: {
  params: any
}) {
  const id = params?.id || "";

  const [notifs, setNotifs] = useState<NotifsTypes>({
    type: 'success',
    title: 'Success',
    message: 'You are being logged in momentarily!',
    toggle: false
  })
  const [current, setCurrent] = useState(0);
  const store = useContext(AppContext);
  const modules = store?.modules || [];

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
    const dataRetrieved = retrieveData("chw-supervision");
    if (!dataRetrieved[id]?.createdDate) {
      const data = {
        ...store?.globalState,
        createdDate: store?.globalState.createdDate || new Date(),
        updatedDate: new Date(),
      };
      dataRetrieved[id] = data;
      localStorage.setItem("chw-supervision", JSON.stringify(dataRetrieved));
    } else {
      store?.setGlobalState((stored) => {
        const toStore = {
          ...dataRetrieved[id],
          ...stored
        }
        dataRetrieved[id] = toStore
        localStorage.setItem("chw-supervision", JSON.stringify(dataRetrieved));
        return (dataRetrieved[id])
      })

    }
  }, [id, current]);

  const retrieveData = (id: string) => {
    const storedData = localStorage.getItem(id);
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      return {};
    }
  };
  const items = modules?.map((item) => ({ key: item.title, title: item.title }));

  return (
    <>
      <Notifications {...notifs} />
      <NavBar setNotifs={setNotifs} id={id} />
      <div style={{ padding: '20px 48px', marginBottom: 80 }}>
        <Steps current={current} items={items} onChange={onChange} />
        <div>{modules?.[current]?.content}</div>
        <div style={{ marginTop: 24 }}>

          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => {
              prev()
            }}>
              Previous
            </Button>
          )}
          {current < modules?.length - 1 && (
            <Button type="primary" onClick={() => {
              next()
            }}>
              Next
            </Button>
          )}
          {current === modules?.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
export const runtime = 'edge';

