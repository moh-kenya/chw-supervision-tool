"use client"
import React from 'react';
import { Form, Checkbox } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Typography } from 'antd';

const { Title } = Typography;

const MonitoringAndEvaluation = () => {
  return (
    <>
      <Form layout="vertical">
        <Title level={2}>Monitoring & Evaluation</Title>
        <FormItem label="Have you conducted an integrated Community DQA in the last 6 months? (Verify with cDQA report- either external/internal)">
          <Checkbox>Yes</Checkbox>
          <Checkbox>No</Checkbox>
        </FormItem>

        <FormItem label="Was the post-cDQA action plan implemented? (Verify with action plan document & supporting activities minutes/reports)">
          <Checkbox>Yes</Checkbox>
          <Checkbox>No</Checkbox>
        </FormItem>
      </Form>
    </>
  );
};

export default MonitoringAndEvaluation;
