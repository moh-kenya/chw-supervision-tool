'use client';

import React from 'react';
import { Typography } from 'antd';
import { DataImport } from '../components/DataImport';

const { Title } = Typography;

export default function DataImportPage() {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Health System Data Import</Title>
      <DataImport />
    </div>
  );
}
