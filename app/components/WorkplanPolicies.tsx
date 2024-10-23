"use client"
import React from 'react';
import { Form, Input, Checkbox, InputNumber } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Typography } from 'antd';

const { Title } = Typography;

const WorkplanPolicies = () => {
  return (
    <Form layout="vertical">
      <Title level={2}>Workforce</Title>
      <FormItem label="Expected No of CHAs/CHOs is">
        <InputNumber min={0} />
      </FormItem>

      <FormItem label="How many CHAs/CHOs do you have?">
        <InputNumber min={0} />
      </FormItem>

      <FormItem label="Comment/Remarks">
        <Input.TextArea rows={3} />
      </FormItem>

      <FormItem label="Number of CHAs/CHOs trained in community health? (at least 2 years training in certified college)">
        <InputNumber min={0} />
      </FormItem>

      <FormItem label="Comment/Remarks">
        <Input.TextArea rows={3} />
      </FormItem>

      <FormItem label="Number of CHAs appraised in the last financial year? (verify with appraisal reports)">
        <InputNumber min={0} />
      </FormItem>

      <FormItem label="Comment">
        <Input.TextArea rows={3} />
      </FormItem>

      {/* CHPs Section */}
      <FormItem label="Expected No of CHPs is">
        <InputNumber min={0} />
      </FormItem>

      <FormItem label="Number of existing CHPs">
        <InputNumber min={0} />
      </FormItem>

      <FormItem label="Comment">
        <Input.TextArea rows={3} />
      </FormItem>

      <FormItem label="Is your CHPs stipends payment status up to date? (payments up to the last month. Both National, County)">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>

      <FormItem label="How many months in arrears?">
        <InputNumber min={0} />
      </FormItem>

      <FormItem label="Comments">
        <Input.TextArea rows={3} />
      </FormItem>

      <FormItem label="Is your CHP Registry up to date? (new ones added, removed non-existent at least once a year)">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>

      <FormItem label="Comment">
        <Input.TextArea rows={3} />
      </FormItem>
      <FormItem label="Are Community Health services integrated in the current county annual workplan?">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>

      <FormItem label="Are Community Health services integrated in the current sub-county annual workplan?">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>

      <FormItem label="Do you have a 5-year costed CHS implementation plan?">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>

      <FormItem label="Comments/Remarks">
        <Input.TextArea rows={4} />
      </FormItem>
    </Form>
  );
};

export default WorkplanPolicies;
