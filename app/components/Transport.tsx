"use client"
import React from 'react';
import { Form, Checkbox } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;

const Transport = () => {
  return (
    <Form layout="vertical">
      <Title level={2}>Transport</Title>
      <Form.Item label="Have you facilitated your CHAs/CHOs with a means of transport (Motorbike/Bicycles)?">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </Form.Item>

      {/* Comment/Remarks */}
      <FormItem label="Comment/Remarks">
        <TextArea rows={3} />
      </FormItem>

      {/* Budget for Maintenance */}
      <FormItem label="Do you have a budget for maintenance of the provided transport means (Servicing & fueling)? (Verify)">
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

export default Transport;