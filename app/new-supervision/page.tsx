"use client"

import SupervisionTeam from '../components/SupervisionTeam';
import CHUFunctionality from '../components/CHUFunctionality';
import React, { useState, createContext } from 'react';
import { Button, message, Steps, theme } from 'antd';
import WorkplanPolicies from '../components/WorkplanPolicies';
import Infrastructure from '../components/Infrastructure';
import MonitoringAndEvaluation from '../components/MonitoringAndEvaluation';
import Commodities from '../components/Commodities';
import Transport from '../components/Transport';
import Referral from '../components/Referral';
import Finance from '../components/Finance';
import Partnership from '../components/Partnership';
import ServiceDelivery from '../components/ServiceDelivery';
import PandemicPreparedness from '../components/PandemicPreparedness';
import NavBar from '../components/NavBar';

export const AppContext = createContext([]);


export default function Home() {


  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [globalState, setGlobalState] = useState({});
  const [modules, setModules] = useState([
    {
      title: 'Supervision Team',
      content: <SupervisionTeam setGlobalState={setGlobalState} />,
    },
    {
      title: 'Leadership & Governance',
      content: <CHUFunctionality setGlobalState={setGlobalState} />
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
  ])
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const onChange = (value: number) => {
    setCurrent(value);
  };

  const items = modules.map((item) => ({ key: item.title, title: item.title }));
  const items2 = [{
    key: "hometopav-1",
    label: `Home`,
  }, {
    key: "hometopav-2",
    label: `New Supervision`,
  }, {
    key: "hometopav-3",
    label: `Account`,
  }]

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
    <AppContext.Provider value={{ globalState, setGlobalState, modules, setModules }}>
      <NavBar />
      <div style={{ padding: '20px 48px', marginBottom: 80 }}>
        <Steps current={current} items={items} onChange={onChange} />
        <div style={contentStyle}>{modules[current]?.content}</div>
        <div style={{ marginTop: 24 }}>

          {current === modules.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Previous
            </Button>
          )}
          {current < modules.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
        </div>
      </div>
    </AppContext.Provider>
  );
}
