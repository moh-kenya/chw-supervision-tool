"use client"
import React from 'react';
import { Form, InputNumber, Radio } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;
const { Group } = Radio
const RadioGroup = Group;

const Commodities = () => {
  return (
    <Form layout="vertical">
      <Title level={2}>Commodities</Title>
      <FormItem required label="Are all your CHPs kitted? (verify with the issuance inventory/S11)">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem required label="No. of CHPs not kitted">
        <InputNumber required min={0} size={'large'} style={{ width: "50%" }} placeholder='Please enter No.' />
      </FormItem>

      <FormItem required label="Comment/Remarks">
        <TextArea rows={3} size={'large'} placeholder='Please enter comments or remarks' />
      </FormItem>

      <FormItem required label="Have you reached last mile distribution for the CHP Kits?">
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

export default Commodities;
