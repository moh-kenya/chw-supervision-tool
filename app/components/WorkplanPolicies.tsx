"use client"
import React from 'react';
import { Form, Input, InputNumber, Radio } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Typography } from 'antd';

const { Title } = Typography;
const { Group } = Radio
const RadioGroup = Group;

const WorkplanPolicies = () => {
  return (
    <Form layout="vertical">
      <Title level={2}>Workforce</Title>
      <FormItem required label="Expected No of CHAs/CHOs is">
        <InputNumber required min={0} size='large' style={{ width: "50%" }} placeholder='Please enter No.' />
      </FormItem>

      <FormItem required label="How many CHAs/CHOs do you have?">
        <InputNumber required min={0} size='large' style={{ width: "50%" }} placeholder='Please enter No.' />
      </FormItem>

      <FormItem label="Comment/Remarks">
        <Input.TextArea rows={3} size='large' placeholder='Please enter comments or remarks' />
      </FormItem>

      <FormItem required label="Number of CHAs/CHOs trained in community health? (at least 2 years training in certified college)">
        <InputNumber required min={0} size='large' style={{ width: "50%" }} placeholder='Please enter No.' />
      </FormItem>

      <FormItem label="Comment/Remarks">
        <Input.TextArea rows={3} size='large' placeholder='Please enter comments or remarks' />
      </FormItem>

      <FormItem required label="Number of CHAs appraised in the last financial year? (verify with appraisal reports)">
        <InputNumber required min={0} size='large' style={{ width: "50%" }} placeholder='Please enter No.' />
      </FormItem>

      <FormItem label="Comment">
        <Input.TextArea rows={3} size='large' placeholder='Please enter comment' />
      </FormItem>

      {/* CHPs Section */}
      <FormItem required label="Expected No of CHPs is">
        <InputNumber required min={0} size='large' style={{ width: "50%" }} placeholder='Please enter No.' />
      </FormItem>

      <FormItem required label="Number of existing CHPs">
        <InputNumber required min={0} size='large' style={{ width: "50%" }} placeholder='Please enter No.' />
      </FormItem>

      <FormItem label="Comment">
        <Input.TextArea rows={3} size='large' placeholder='Please enter comment' />
      </FormItem>

      <FormItem required label="Is your CHPs stipends payment status up to date? (payments up to the last month. Both National, County)">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem required label="How many months in arrears?">
        <InputNumber required min={0} size='large' style={{ width: "50%" }} placeholder='Please enter No.' />
      </FormItem>

      <FormItem required label="Comments">
        <Input.TextArea rows={3} size='large' placeholder='Please enter comments or remarks' />
      </FormItem>

      <FormItem required label="Is your CHP Registry up to date? (new ones added, removed non-existent at least once a year)">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem label="Comment">
        <Input.TextArea rows={3} size='large' style={{ width: "50%" }} placeholder='Please enter comment' />
      </FormItem>
      <FormItem required label="Are Community Health services integrated in the current county annual workplan?">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem required label="Are Community Health services integrated in the current sub-county annual workplan?">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem required label="Do you have a 5-year costed CHS implementation plan?">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem label="Comments/Remarks">
        <Input.TextArea rows={4} size='large' placeholder='Please enter comments or remarks' />
      </FormItem>
    </Form>
  );
};

export default WorkplanPolicies;
