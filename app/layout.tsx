import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import React from 'react';
import { initDB } from 'react-indexed-db-hook';
import { Providers } from './providers';
import DBConfig from './utils/DBConfig';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Integrated CHS Supervision Tool',
  description: 'Ministry of Health - eCHIS Integrated CHS Supervision Tool',
};

initDB(DBConfig);

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning
      >
        <AntdRegistry>
          <Providers>{children}</Providers>
        </AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
