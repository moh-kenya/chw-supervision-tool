"use client"
import React from 'react';
import { Form, Radio } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;
const { Group } = Radio
const RadioGroup = Group;

const Transport = () => {
  return (
    <Form layout="vertical">
      <Title level={2}>Transport</Title>
      <Form.Item required label="Have you facilitated your CHAs/CHOs with a means of transport (Motorbike/Bicycles)?">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </Form.Item>

      <FormItem required label="Comment/Remarks">
        <TextArea rows={3} size={'large'} placeholder='Please enter comments or remarks' />
      </FormItem>

      <FormItem required label="Do you have a budget for maintenance of the provided transport means (Servicing & fueling)? (Verify)">
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

export default Transport;
