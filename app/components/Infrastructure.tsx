"use client"
import React from 'react';
import { Form, Radio } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;
const { Group } = Radio
const RadioGroup = Group;

const Infrastructure = () => {
  return (
    <Form layout="vertical">
      <Title level={2}>Infrastructure</Title>
      {/* Designated Office */}
      <FormItem required label="Do you have an office space for CHU at the linked facility?">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem required label="Comment/Remarks">
        <TextArea rows={3} size={'large'} placeholder='Please enter comments or remarks' />
      </FormItem>

      {/* ICT Infrastructure */}
      <FormItem required label="Do all your CHUs have access to the ICT infrastructure (Desktop/Laptop & Internet)?">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem required label="Comment/Remarks">
        <TextArea rows={3} size={'large'} placeholder='Please enter comments or remarks' />
      </FormItem>

      {/* Inventory Document for CH Office */}
      <FormItem required label="Do you have an inventory document for CH office?">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>

      {/* Up-to-date Inventory of CHS Equipment */}
      <FormItem required label="Do you have an up-to-date inventory of all the CHS equipment? (e.g., CHP kits, Mobile phones etc—confirm with the inventory document)">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem label="Comment">
        <TextArea rows={3} size={'large'} />
      </FormItem>

    </Form>
  );
};

export default Infrastructure;
