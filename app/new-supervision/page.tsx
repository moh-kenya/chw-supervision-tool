"use client"
import React, { useContext, useState } from 'react';
import { Button, message, Steps } from 'antd';
import NavBar from '../components/NavBar';
import { AppContext } from '../providers';




export default function Home() {
  const [current, setCurrent] = useState(0);
  const store = useContext(AppContext);
  console.log(store)
  const { modules } = store || {};

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const onChange = (value: number) => {
    setCurrent(value);
  };

  const items = modules?.map((item) => ({ key: item.title, title: item.title }));

  return (
    <>
      <NavBar />
      <div style={{ padding: '20px 48px', marginBottom: 80 }}>
        <Steps current={current} items={items} onChange={onChange} />
        <div>{modules?.[current]?.content}</div>
        <div style={{ marginTop: 24 }}>

          {current === modules?.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Previous
            </Button>
          )}
          {current < modules?.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
