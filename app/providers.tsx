"use client";
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
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

// Define a specific type for globalState if known, otherwise replace it with a placeholder.
interface GlobalStateType {
    [key: string]: string | number | boolean | object; // Replace with actual properties if known.
}

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
export const AppContext = createContext<AppContextType | undefined>(undefined);

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    const [globalState, setGlobalState] = useState<GlobalStateType>({});
    const [modules, setModules] = useState<Module[]>([
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
    ]);

    return (
        <AppContext.Provider value={{ globalState, setGlobalState, modules, setModules }}>
            {children}
        </AppContext.Provider>
    );
}
