"use client"
import React from 'react';
import { Form, Radio } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Typography } from 'antd';

const { Title } = Typography;
const { Group } = Radio
const RadioGroup = Group;

const PandemicPreparedness = () => {
  return (
    <Form layout="vertical">
      <Title level={2}>Pandemic Preparedness</Title>
      <FormItem required label="Presence of a functional pandemic preparedness and response team (verify with minutes)">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem required label="Existence of Pandemic Preparedness plan (Verify availability finance/resource mobilization plan,Risk Communication and Community Engagement (RCCE) plan)">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem required label="Dedicated budget for pandemic response (verify)">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem required label="Pandemic Preparedness Stakeholder Co-ordination mechanism in place (verify with minutes)">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>
    </Form>
  );
};

export default PandemicPreparedness;
