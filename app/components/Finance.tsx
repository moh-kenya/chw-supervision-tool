"use client"
import React from 'react';
import { Form, Radio } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;
const { Group } = Radio
const RadioGroup = Group;

const Finance = () => {
  return (
    <Form layout="vertical">
      <Title level={2}>Finance</Title>
      <FormItem required label="Have you committed financial resources through budgeting process to support community health? (Verify with budgets, etc)">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem required label="Comment/Remarks">
        <TextArea rows={3} size={'large'} placeholder='Please enter comments or remarks' />
      </FormItem>
      <FormItem required label="What proportion of the county health budget is allocated to CHS? (verify)">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem required label="Comment/Remarks">
        <TextArea rows={3} size={'large'} placeholder='Please enter comments or remarks' />
      </FormItem>
    </Form>
  );
};

export default Finance;
