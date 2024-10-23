"use client"
import React from 'react';
import { Form, Checkbox } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;

const Referral = () => {
  return (
    <Form layout="vertical">
      <Title level={2}>Referral</Title>
      <FormItem label="Have you supplied all your CHPs with referral tools?">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>
      <FormItem label="Comment/Remarks">
        <TextArea rows={3} />
      </FormItem>
    </Form>
  );
};

export default Referral;
