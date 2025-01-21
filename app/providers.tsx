'use client';

import React, { createContext, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db-hook';
import SupervisionTeam from './components/SupervisionTeam';
import CHUFunctionality from './components/CHUFunctionality';
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
import ReviewAndSubmit from './components/ReviewAndSubmit';
import {
  type ProvidersProps,
  type AppContextType,
  type GlobalStateType,
  type Module,
} from './components/utils/Types';

// Create the context with the appropriate type
export const AppContext = createContext<AppContextType | null>(null);

export const Providers = ({ children }: ProvidersProps): JSX.Element => {
  const db = useIndexedDB('entries');
  const [globalState, setGlobalState] = useState<GlobalStateType>({
    supervisionTeam: {},
    chuFunctionality: {},
    Infrastructure: {},
    commodities: {},
    createdDate: new Date(),
    finance: {},
    monitoringAndEvalutation: {},
    pandemicPreparedness: {},
    partnership: {},
    referral: {},
    serviceDelivery: {},
    status: 'Draft',
    transport: {},
    updatedDate: new Date(),
  });

  const [modules, setModules] = useState<Module[]>([
    {
      title: 'Supervision Team',
      content: (
        <SupervisionTeam
          setGlobalState={setGlobalState}
          globalState={globalState}
          store={AppContext}
          db={db}
        />
      ),
    },
    {
      title: 'Leadership & Governance',
      content: (
        <CHUFunctionality
          setGlobalState={setGlobalState}
          globalState={globalState}
          store={AppContext}
        />
      ),
    },
    {
      title: 'Workforce',
      content: (
        <WorkplanPolicies
          setGlobalState={setGlobalState}
          globalState={globalState}
          store={AppContext}
        />
      ),
    },
    {
      title: 'Infrastructure',
      content: (
        <Infrastructure
          setGlobalState={setGlobalState}
          globalState={globalState}
          store={AppContext}
        />
      ),
    },
    {
      title: 'Monitoring & Evaluation',
      content: (
        <MonitoringAndEvaluation
          globalState={globalState}
          setGlobalState={setGlobalState}
          store={AppContext}
        />
      ),
    },
    {
      title: 'Commodities',
      content: (
        <Commodities
          setGlobalState={setGlobalState}
          globalState={globalState}
          store={AppContext}
        />
      ),
    },
    {
      title: 'Transport',
      content: (
        <Transport
          setGlobalState={setGlobalState}
          globalState={globalState}
          store={AppContext}
        />
      ),
    },
    {
      title: 'Referral',
      content: (
        <Referral
          setGlobalState={setGlobalState}
          globalState={globalState}
          store={AppContext}
        />
      ),
    },
    {
      title: 'Finance',
      content: (
        <Finance
          setGlobalState={setGlobalState}
          globalState={globalState}
          store={AppContext}
        />
      ),
    },
    {
      title: 'Partnership',
      content: (
        <Partnership
          setGlobalState={setGlobalState}
          globalState={globalState}
          store={AppContext}
        />
      ),
    },
    {
      title: 'Service Delivery',
      content: (
        <ServiceDelivery
          setGlobalState={setGlobalState}
          globalState={globalState}
          store={AppContext}
        />
      ),
    },
    {
      title: 'Pandemic Preparedness',
      content: (
        <PandemicPreparedness
          globalState={globalState}
          setGlobalState={setGlobalState}
          store={AppContext}
        />
      ),
    },
    {
      title: 'Review & Submit',
      content: (
        <ReviewAndSubmit
          setGlobalState={setGlobalState}
          globalState={globalState}
          store={AppContext}
        />
      ),
    },
  ]);

  const contextValue = React.useMemo(
    () => ({ globalState, setGlobalState, modules, setModules }),
    [globalState, modules]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
