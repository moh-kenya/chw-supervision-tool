"use client"
import { useContext } from "react";
import { AppContext } from "../providers";
import { Typography } from 'antd';
import SupervisionTeam from "./SupervisionTeam";
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
      {store?.globalState?.superVisionTeam && <SupervisionTeam setGlobalState={setGlobalState} disabled={true} />}
      {store?.globalState?.chuFunctionality && <CHUFunctionality setGlobalState={setGlobalState} disabled={true} />}
      {store?.globalState?.workplanPolicies && <WorkplanPolicies setGlobalState={setGlobalState} disabled={true} />}
      {store?.globalState?.infrastructure && <Infrastructure setGlobalState={setGlobalState} disabled={true} />}
      {store?.globalState?.monitoringAndEvaluation && <MonitoringAndEvaluation setGlobalState={setGlobalState} disabled={true} />}
      {store?.globalState?.commodities && <Commodities setGlobalState={setGlobalState} disabled={true} />}
      {store?.globalState?.transport && <Transport setGlobalState={setGlobalState} disabled={true} />}
      {store?.globalState?.referral && <Referral setGlobalState={setGlobalState} disabled={true} />}
      {store?.globalState?.finance && <Finance setGlobalState={setGlobalState} disabled={true} />}
      {store?.globalState?.partnership && <Partnership setGlobalState={setGlobalState} disabled={true} />}
      {store?.globalState?.serviceDelivery && <ServiceDelivery setGlobalState={setGlobalState} disabled={true} />}
      {store?.globalState?.pandemicPreparedness && <PandemicPreparedness setGlobalState={setGlobalState} disabled={true} />}
    </>
  );
};

export default ReviewAndSubmit;
