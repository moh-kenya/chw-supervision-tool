'use client';

import { Typography } from 'antd';
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
  const { setGlobalState, store } = props;
  return (
    <>
      <Title level={2}>Review and Submit</Title>
      {store?.globalState?.supervisionTeam && (
        <SupervisionTeam
          setGlobalState={setGlobalState}
          store={store}
          disabled
        />
      )}
      {store?.globalState?.chuFunctionality && (
        <CHUFunctionality
          setGlobalState={setGlobalState}
          store={store}
          disabled
        />
      )}
      {store?.globalState?.workplanPolicies && (
        <WorkplanPolicies
          setGlobalState={setGlobalState}
          store={store}
          disabled
        />
      )}
      {store?.globalState?.infrastructure && (
        <Infrastructure
          setGlobalState={setGlobalState}
          store={store}
          disabled
        />
      )}
      {store?.globalState?.monitoringAndEvaluation && (
        <MonitoringAndEvaluation
          setGlobalState={setGlobalState}
          store={store}
          disabled
        />
      )}
      {store?.globalState?.commodities && (
        <Commodities setGlobalState={setGlobalState} store={store} disabled />
      )}
      {store?.globalState?.transport && (
        <Transport setGlobalState={setGlobalState} store={store} disabled />
      )}
      {store?.globalState?.referral && (
        <Referral setGlobalState={setGlobalState} store={store} disabled />
      )}
      {store?.globalState?.finance && (
        <Finance setGlobalState={setGlobalState} store={store} disabled />
      )}
      {store?.globalState?.partnership && (
        <Partnership setGlobalState={setGlobalState} store={store} disabled />
      )}
      {store?.globalState?.serviceDelivery && (
        <ServiceDelivery
          setGlobalState={setGlobalState}
          store={store}
          disabled
        />
      )}
      {store?.globalState?.pandemicPreparedness && (
        <PandemicPreparedness
          setGlobalState={setGlobalState}
          store={store}
          disabled
        />
      )}
    </>
  );
};

export default ReviewAndSubmit;
