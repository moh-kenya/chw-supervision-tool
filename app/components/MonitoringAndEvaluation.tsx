"use client"
import React from 'react';
import { Form, Radio } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Typography } from 'antd';

const { Title } = Typography;
const { Group } = Radio
const RadioGroup = Group;

const MonitoringAndEvaluation = () => {
  return (
    <>
      <Form layout="vertical">
        <Title level={2}>Monitoring & Evaluation</Title>
        <FormItem required label="Have you conducted an integrated Community DQA in the last 6 months? (Verify with cDQA report- either external/internal)">
          <RadioGroup>
            <Radio value={'yes'}>Yes</Radio>
            <Radio value={'no'}>No</Radio>
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
