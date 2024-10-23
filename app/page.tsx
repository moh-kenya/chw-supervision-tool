"use client"
import { Menu, Layout } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import {
  HomeOutlined,
  UserOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
import SupervisionTeam from './components/SupervisionTeam';
// import LocationDetails from './components/LocationDetails';
import CHUFunctionality from './components/CHUFunctionality';
import React, { useState, createContext } from 'react';
import { Button, message, Steps, theme } from 'antd';
import WorkplanPolicies from './components/WorkplanPolicies';
import Infrastructure from './components/Infrastructure';
import MonitoringAndEvaluation from './components/MonitoringAndEvaluation';
import Commodities from './components/Commodities';
import Transport from './components/Transport';
import Referral from './components/Referral';
import Finance from './components/Finance';
import Partnership from './components/Partnership';
import ServiceDelivery from './components/ServiceDelivery';
import PandemicPreparedness from './components/PandemicPreparedness';
import Image from 'next/image';
const { Header } = Layout;

export const AppContext = createContext([]);

export default function Home() {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [globalState, setGlobalState] = useState([]);
  const steps = [
    {
      title: 'Supervision Team',
      content: <SupervisionTeam />,
    },
    {
      title: 'Leadership & Governance',
      content: <CHUFunctionality />
    },
    {
      title: 'Workforce',
      content: <WorkplanPolicies />
    },
    {
      title: 'Infrastructure',
      content: <Infrastructure />
    },
    {
      title: 'Monitoring & Evaluation',
      content: <MonitoringAndEvaluation />
    },
    {
      title: 'Commodities',
      content: <Commodities />
    },
    {
      title: 'Transport',
      content: <Transport />
    },
    {
      title: 'Referral',
      content: <Referral />
    },
    {
      title: 'Finance',
      content: <Finance />
    },
    {
      title: 'Partnership',
      content: <Partnership />
    },
    {
      title: 'Service Delivery',
      content: <ServiceDelivery />
    },
    {
      title: 'Pandemic Preparedness',
      content: <PandemicPreparedness />
    },
    // {
    //   title: 'Non-Communicable Diseases',
    //   content: <WorkplanPolicies />
    // },
    // {
    //   title: 'Communicable Diseases',
    //   content: <WorkplanPolicies />
    // },
    // {
    //   title: 'Reproductive and Maternal Newborn Health',
    //   content: <WorkplanPolicies />
    // }
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const onChange = (value: number) => {
    setCurrent(value);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  const items2 = [{
    key: "hometopav-1",
    label: `Home`,
  }, {
    key: "hometopav-2",
    label: `New Supervision`,
  }, {
    key: "hometopav-3",
    label: `Account`,
  }];

  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 20,
    padding: "0 16px"
  };
  return (
    <AppContext.Provider value={{ globalState, setGlobalState }}>
      <div>
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
          <Image alt={"logo"} height={50} width={187} src={"data:image/png;base64,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"} />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={items2}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Header>
        <div className="navbar">
          <Menu mode="horizontal" theme="dark" className='bottombar'>
            <MenuItem key="1"><HomeOutlined className='menu-icons' /></MenuItem>
            <MenuItem key="2"><PlusCircleOutlined className='menu-icons' /></MenuItem>
            <MenuItem key="3"><UserOutlined className='menu-icons' /></MenuItem>
          </Menu>
        </div>
        <div style={{ padding: '20px 48px', marginBottom: 80 }}>
          <Steps current={current} items={items} onChange={onChange} />
          <div style={contentStyle}>{steps[current].content}</div>
          <div style={{ marginTop: 24 }}>

            {current === steps.length - 1 && (
              <Button type="primary" onClick={() => message.success('Processing complete!')}>
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}
