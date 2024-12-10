"use client"
import React from 'react';
import { Form, Radio } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Typography } from 'antd';

const { Title } = Typography;
const { Group } = Radio;
const RadioGroup = Group;

const MonitoringAndEvaluation = () => {
  return (
    <>
      <Form layout="vertical">
        <Title level={2}>Monitoring & Evaluation</Title>

        <FormItem
          required
          label="How often do you conduct data review meetings?"
        >
          <RadioGroup>
            <Radio value={3}>Monthly</Radio>
            <Radio value={2}>Quarterly</Radio>
            <Radio value={1}>Biannually</Radio>
            <Radio value={1}>Unscheduled</Radio>
            <Radio value={1}>Annually</Radio>
            <Radio value={0}>None</Radio>
          </RadioGroup>
        </FormItem>

    
        <FormItem required label="Was the post-cDQA action plan implemented? (Verify with action plan document & supporting activities minutes/reports)">
          <RadioGroup>
            <Radio value={'yes'}>Yes</Radio>
            <Radio value={'no'}>No</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </>
  );
};

export default MonitoringAndEvaluation;
