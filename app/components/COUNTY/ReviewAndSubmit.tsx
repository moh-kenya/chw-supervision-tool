'use client';

import { useContext } from 'react';
import { Typography } from 'antd';
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
    </>
  );
};

export default ReviewAndSubmit;
