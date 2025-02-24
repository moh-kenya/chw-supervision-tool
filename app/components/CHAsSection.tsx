'use client';

import React from 'react';
import { Form, Input, InputNumber, Typography } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;

const CHAsSection = () => {
  return (
    <Form layout="vertical">
      <Title level={2}>Workforce</Title>

      <FormItem required label="How many CHAs/CHOs do you have?">
        <InputNumber
          required
          min={0}
          max={15000}
          size="large"
          style={{ width: '50%' }}
          placeholder="Please enter No."
        />
      </FormItem>

      <FormItem label="Comment">
        <TextArea rows={4} />
      </FormItem>
    </Form>
  );
};

export default CHAsSection;
