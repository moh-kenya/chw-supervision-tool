'use client';

import { useContext, useState } from 'react';
import { Typography, Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import { createSupervisionData } from '../lib/server/database';
import { AppContext } from '../providers';
import SupervisionTeam from './SupervisionTeam';
import CHUFunctionality from './CHUFunctionality';
import WorkplanPolicies from './WorkplanPolicies';
import Infrastructure from './Infrastructure';
import MonitoringAndEvaluation from './MonitoringAndEvaluation';
import Commodities from './Commodities';
import Transport from './Transport';
import Referral from './Referral';
import Finance from './Finance';
import Partnership from './Partnership';
import ServiceDelivery from './ServiceDelivery';
import PandemicPreparedness from './PandemicPreparedness';

const { Title } = Typography;

const ReviewAndSubmit = (props) => {
  const { setGlobalState } = props;
  const store = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Validate the form data
  const validateForm = () => {
    const requiredSections = [
      'superVisionTeam',
      'chuFunctionality',
      'workplanPolicies',
      'infrastructure',
      'monitoringAndEvaluation',
      'commodities',
      'transport',
      'referral',
      'finance',
      'partnership',
      'serviceDelivery',
      'pandemicPreparedness'
    ];

    // Debug: Log the current state
    console.log('Current form state:', store?.globalState);

    const missingSections = requiredSections.filter(section => {
      const hasSection = !!store?.globalState?.[section];
      console.log(`Checking section ${section}:`, hasSection);
      return !hasSection;
    });

    if (missingSections.length > 0) {
      const missingNames = missingSections
        .map(s => s.replace(/([A-Z])/g, ' $1').trim())
        .join(', ');
      
      console.log('Missing sections:', missingSections);
      message.error({
        content: `Please complete the following sections: ${missingNames}`,
        duration: 5,
        style: {
          marginTop: '20vh',
        },
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    try {
      // Check if we have the required data
      if (!store?.globalState) {
        message.error({
          content: 'No form data available',
          duration: 5,
          style: { marginTop: '20vh' }
        });
        return;
      }
      if (!validateForm()) {
        return;
      }

      setLoading(true);
      
      if (!store.globalState) {
        throw new Error('No form data available');
      }

      
      const formData = {
        ...store.globalState,
        
        locationDetails: {
          county: store.globalState.superVisionTeam?.county || '',
          subCounty: store.globalState.superVisionTeam?.subCounty || '',
          chu: store.globalState.superVisionTeam?.chu || ''
        },
        status: 'completed',
        submittedAt: new Date().toISOString()
      };
      
      console.log('Submitting form data:', formData);
      
      // Create a new document in the database
      const response = await createSupervisionData(formData);

      message.success({
        content: 'Supervision form submitted successfully!',
        duration: 5,
        style: {
          marginTop: '20vh',
        },
      });

      console.log('Submission successful:', response);
      
      // Clear the form and redirect to dashboard
      setTimeout(() => {
        setGlobalState({});
        router.push('/dashboard');
      }, 1500);
      
    } catch (error) {
      console.error('Submission error:', error);
      message.error({
        content: error instanceof Error 
          ? error.message 
          : 'Failed to submit form. Please try again.',
        duration: 5,
        style: {
          marginTop: '20vh',
        },
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Title level={2}>Review and Submit</Title>
      {store?.globalState?.superVisionTeam && (
        <SupervisionTeam setGlobalState={setGlobalState} disabled />
      )}
      {store?.globalState?.chuFunctionality && (
        <CHUFunctionality setGlobalState={setGlobalState} disabled />
      )}
      {store?.globalState?.workplanPolicies && (
        <WorkplanPolicies setGlobalState={setGlobalState} disabled />
      )}
      {store?.globalState?.infrastructure && (
        <Infrastructure setGlobalState={setGlobalState} disabled />
      )}
      {store?.globalState?.monitoringAndEvaluation && (
        <MonitoringAndEvaluation setGlobalState={setGlobalState} disabled />
      )}
      {store?.globalState?.commodities && (
        <Commodities setGlobalState={setGlobalState} disabled />
      )}
      {store?.globalState?.transport && (
        <Transport setGlobalState={setGlobalState} disabled />
      )}
      {store?.globalState?.referral && (
        <Referral setGlobalState={setGlobalState} disabled />
      )}
      {store?.globalState?.finance && (
        <Finance setGlobalState={setGlobalState} disabled />
      )}
      {store?.globalState?.partnership && (
        <Partnership setGlobalState={setGlobalState} disabled />
      )}
      {store?.globalState?.serviceDelivery && (
        <ServiceDelivery setGlobalState={setGlobalState} disabled />
      )}
      {store?.globalState?.pandemicPreparedness && (
        <PandemicPreparedness setGlobalState={setGlobalState} disabled />
      )}
      <div style={{ marginTop: '24px', padding: '24px', background: '#f5f5f5', borderRadius: '8px' }}>
        <div style={{ marginBottom: '16px' }}>
          <Title level={4}>Ready to Submit?</Title>
          <p>Please review all the sections above carefully before submitting. Make sure all required information is filled correctly.</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <Button 
            size="large"
            onClick={() => router.push('/dashboard')}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            type="primary" 
            size="large"
            onClick={handleSubmit}
            loading={loading}
          >
            {loading ? 'Submitting...' : 'Submit Supervision Form'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ReviewAndSubmit;
