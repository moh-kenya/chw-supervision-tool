import { type Dispatch, type SetStateAction, type ReactNode } from 'react';

export interface CHUFunctionalityProps {
  disabled: boolean;
  store: {
    globalState: {
      superVisionTeam: {
        whoAreRespondents: unknown[];
      };
      chuFunctionality: unknown;
    };
  };
  setGlobalState: (store: unknown) => void;
}

// Define a specific type for globalState if known, otherwise replace it with a placeholder.
export type GlobalStateType = Record<
  string,
  string | number | boolean | object
>;

// Define the structure of each module item
export interface Module {
  title: string;
  content: ReactNode;
}

// Define the structure of the context value
export interface AppContextType {
  globalState: GlobalStateType;
  setGlobalState: Dispatch<SetStateAction<GlobalStateType>>;
  modules: Module[];
  setModules: Dispatch<SetStateAction<Module[]>>;
}
export interface ProvidersProps {
  children: ReactNode;
}

export type RequestBody = Record<string, unknown>;

export interface AppwriteError {
  response?: {
    message?: string;
  };
}

export interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

export interface FormValues {
  emailOrPhone: string;
  password: string;
}
export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export interface NotifsTypes {
  type: NotificationType;
  title: string;
  message: string;
  toggle: boolean;
}

export interface SupervisionTeamProps {
  globalState: GlobalStateType;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalStateType>>;
}

export interface TeamMember {
  name: string;
  designation: string;
  organization: string;
}

export interface SubCounty {
  value: string;
  label: string;
}
