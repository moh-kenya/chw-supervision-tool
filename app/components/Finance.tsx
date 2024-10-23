"use client"
import React from 'react';
import { Form, Checkbox } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;

const Finance = () => {
  return (
    <Form layout="vertical">
      <Title level={2}>Finance</Title>
      <FormItem label="Have you committed financial resources through budgeting process to support community health? (Verify with budgets, etc)">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>

      {/* Comment/Remarks */}
      <FormItem label="Comment/Remarks">
        <TextArea rows={3} />
      </FormItem>

      {/* Last Mile Distribution */}
      <FormItem label="What proportion of the county health budget is allocated to CHS? (verify)">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>

      {/* Comment/Remarks */}
      <FormItem label="Comment/Remarks">
        <TextArea rows={3} />
      </FormItem>
    </Form>
  );
};

export default Finance;
