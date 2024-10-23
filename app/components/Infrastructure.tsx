"use client"
import React from 'react';
import { Form, Checkbox } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;

const Infrastructure = () => {
  return (
    <Form layout="vertical">
      <Title level={2}>Infrastructure</Title>
      {/* Designated Office */}
      <FormItem label="Do all your CHUs have designated office?">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>

      <FormItem label="Comment/Remarks">
        <TextArea rows={3} />
      </FormItem>

      {/* ICT Infrastructure */}
      <FormItem label="Do all your CHUs have access to the ICT infrastructure (Desktop/Laptop & Internet)?">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>

      <FormItem label="Comment/Remarks">
        <TextArea rows={3} />
      </FormItem>

      {/* Inventory Document for CH Office */}
      <FormItem label="Do you have an inventory document for CH office?">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>

      {/* Up-to-date Inventory of CHS Equipment */}
      <FormItem label="Do you have an up-to-date inventory of all the CHS equipment? (e.g., CHP kits, Mobile phones etc—confirm with the inventory document)">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>

      <FormItem label="Comment">
        <TextArea rows={3} />
      </FormItem>

    </Form>
  );
};

export default Infrastructure;
