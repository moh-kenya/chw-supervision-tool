'use client';

import React, {
  createContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react';
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

// Define a specific type for globalState if known, otherwise replace it with a placeholder.
type GlobalStateType = Record<string, string | number | boolean | object>;

// Define the structure of each module item
interface Module {
  title: string;
  content: ReactNode;
}

// Define the structure of the context value
interface AppContextType {
  globalState: GlobalStateType;
  setGlobalState: Dispatch<SetStateAction<GlobalStateType>>;
  modules: Module[];
  setModules: Dispatch<SetStateAction<Module[]>>;
}

// Create the context with the appropriate type
export const AppContext = createContext<AppContextType | null>(null);

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  const [globalState, setGlobalState] = useState<GlobalStateType>({});
  const [modules, setModules] = useState<Module[]>([
    {
      title: 'Supervision Team',
      content: <SupervisionTeam setGlobalState={setGlobalState} />,
    },
    {
      title: 'Leadership & Governance',
      content: <CHUFunctionality setGlobalState={setGlobalState} />,
    },
    {
      title: 'Workforce',
      content: <WorkplanPolicies setGlobalState={setGlobalState} />,
    },
    {
      title: 'Infrastructure',
      content: <Infrastructure setGlobalState={setGlobalState} />,
    },
    {
      title: 'Monitoring & Evaluation',
      content: <MonitoringAndEvaluation setGlobalState={setGlobalState} />,
    },
    {
      title: 'Commodities',
      content: <Commodities setGlobalState={setGlobalState} />,
    },
    {
      title: 'Transport',
      content: <Transport setGlobalState={setGlobalState} />,
    },
    {
      title: 'Referral',
      content: <Referral setGlobalState={setGlobalState} />,
    },
    {
      title: 'Finance',
      content: <Finance setGlobalState={setGlobalState} />,
    },
    {
      title: 'Partnership',
      content: <Partnership setGlobalState={setGlobalState} />,
    },
    {
      title: 'Service Delivery',
      content: <ServiceDelivery setGlobalState={setGlobalState} />,
    },
    {
      title: 'Pandemic Preparedness',
      content: <PandemicPreparedness setGlobalState={setGlobalState} />,
    },
    {
      title: 'Review & Submit',
      content: <ReviewAndSubmit setGlobalState={setGlobalState} />,
    },
  ]);

  return (
    <AppContext.Provider
      value={{ globalState, setGlobalState, modules, setModules }}
    >
      {children}
    </AppContext.Provider>
  );
};
