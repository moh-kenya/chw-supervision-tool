"use client"
import React from 'react';
import { Form, Radio } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;
const { Group } = Radio
const RadioGroup = Group;

const Referral = () => {
  return (
    <Form layout="vertical">
      <Title level={2}>Referral</Title>
      <FormItem required label="Do you have a desk at the link facility manned by the CHPSs(Verify)">
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

export default Referral;
