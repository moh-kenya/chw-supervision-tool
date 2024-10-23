"use client"
import React from 'react';
import { Form, Checkbox } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Typography } from 'antd';

const { Title } = Typography;

const PandemicPreparedness = () => {
  return (
    <Form layout="vertical">
      <Title level={2}>Service Delivery</Title>
      <FormItem label="Presence of a functional pandemic preparedness and response team (verify with minutes)">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>
      <FormItem label="Existence of Pandemic Preparedness plan (Verify availability finance/resource mobilization plan,Risk Communication and Community Engagement (RCCE) plan)">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>
      <FormItem label="Dedicated budget for pandemic response (verify)">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>
      <FormItem label="Pandemic Preparedness Stakeholder Co-ordination mechanism in place (verify with minutes)">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>
    </Form>
  );
};

export default PandemicPreparedness;
