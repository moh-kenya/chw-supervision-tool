
import NavBar from '../components/NavBar';
import { Alert } from 'antd';

import { Providers } from '../providers';

export default function Home() {

  return (
    <Providers>
      <NavBar />
      <div style={{ padding: '20px 48px', marginBottom: 80 }}>
        <Alert
          message="No Drafts or Submitted data available."
          description="Submit a new supervision or save to drafts to view any a supervision assessment"
          type="info"
          showIcon
        />
      </div>
    </Providers>
  );
}