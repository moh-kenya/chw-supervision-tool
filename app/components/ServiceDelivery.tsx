"use client"
import React from 'react';
import { Form, Checkbox } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;

const ServiceDelivery = () => {
  return (
    <Form layout="vertical">
      <Title level={2}>Service Delivery</Title>
      <FormItem label="Do you have functional Community Maternal and Perinatal Deaths Surveillance and Response (cMPDSR) committee? (Verify with the latest meeting minutes)">
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

export default ServiceDelivery;
