"use client"
import React from 'react';
import { Form, Radio } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;
const { Group } = Radio
const RadioGroup = Group;

const Partnership = () => {
  return (
    <Form layout="vertical">
      <Title level={2}>Partnership</Title>
      <FormItem required label="Do you have a PHC/CHS stakeholder forum/TWG with clear TORs (defining the scope of work)?">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem required label="In the last quarter did you convene the PHC/CHS stakeholder forum/TWG? (Verify with reports)">
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

export default Partnership;
