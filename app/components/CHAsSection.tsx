"use client"
import React from 'react';
import { Form, Input, InputNumber } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/es/input/TextArea';
import { Typography } from 'antd';

const { Title } = Typography;

const CHAsSection = () => {
  return (
    <Form layout="vertical">
         <Title level={2}>Workforce</Title>
      <FormItem label="Expected No of CHAs/CHOs">
        <InputNumber min={0} />
      </FormItem>

      <FormItem label="How many CHAs/CHOs do you have?">
        <InputNumber min={0} />
      </FormItem>

      <FormItem label="Comments/Remarks">
        <Input.TextArea rows={4} />
      </FormItem>

      <FormItem label="Number of CHAs appraised in the last financial year?">
        <InputNumber min={0} />
      </FormItem>

      <FormItem label="Comment">
        <TextArea rows={4} />
      </FormItem>
    </Form>
  );
};

export default CHAsSection;
