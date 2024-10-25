"use client"

import React, { useState, createContext } from 'react';
import NavBar from './components/NavBar';
import { Alert } from 'antd';
import { Client } from 'appwrite';

export const client = new Client();

client
  .setEndpoint('https://backend-moh.karimkkanji.com/v1')
  .setProject('671b69380019aff6cad1');

export const AppContext = createContext([]);

export default function Home() {

  const [globalState, setGlobalState] = useState({});

  return (
    <AppContext.Provider value={{ globalState, setGlobalState }}>
      <NavBar />
      <div style={{ padding: '20px 48px', marginBottom: 80 }}>
        <Alert
          message="No Drafts or Submitted data available."
          description="Submit a new supervision or save to drafts to view any a supervision assessment"
          type="info"
          showIcon
        />
      </div>
    </AppContext.Provider>
  );
}