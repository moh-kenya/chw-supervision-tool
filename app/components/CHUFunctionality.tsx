"use client"
import React from 'react';
import { Form, Input, InputNumber, Checkbox } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;

const CHUFunctionality = () => {
  return (
    <Form layout="vertical">
      <Title level={2}>Leadership & Governance</Title>
      <FormItem label="Community Health Units structures in place">
        <Input />
      </FormItem>

      <FormItem label="Expected No of CHUs">
        <InputNumber min={0} />
      </FormItem>

      <FormItem label="No of CHUs established">
        <InputNumber min={0} />
      </FormItem>

      <FormItem label="Percentage of establishment of CHU">
        <InputNumber min={0} max={100} formatter={value => `${value}%`} />
      </FormItem>

      <FormItem label="No of CHUs registered in MCHUR">
        <InputNumber min={0} />
      </FormItem>

      <FormItem label="Comments/Remarks">
        <TextArea rows={4} />
      </FormItem>
      <FormItem label="Have you conducted CHU functionality assessment in the last 12 months? (Verify with reports/minutes)">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>

      {/* Comment/Remarks */}
      <FormItem label="Comment/Remarks">
        <TextArea rows={3} />
      </FormItem>

      {/* Based on the CHU functionality assessment report */}
      <FormItem label="Enter total No of assessed CHUs">
        <InputNumber min={0} />
      </FormItem>

      <FormItem label="Enter No of fully-functional CHUs">
        <InputNumber min={0} />
      </FormItem>

      <FormItem label="Enter No of Semi-functional CHUs">
        <InputNumber min={0} />
      </FormItem>

      <FormItem label="Enter No of Non-functional CHUs">
        <InputNumber min={0} />
      </FormItem>

      {/* Comment */}
      <FormItem label="Comment">
        <TextArea rows={3} />
      </FormItem>

      {/* Annual WorkPlan & Performance */}
      <FormItem label="Are Community Health services integrated in the current county annual workplan? (Confirm with the AWP)">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>

      <FormItem label="Are Community Health services integrated in the current sub-county annual workplan? (Confirm with the AWP)">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>

      <FormItem label="Do you have a 5-year costed CHS implementation plan?">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>

      {/* Comments/Remarks */}
      <FormItem label="Comments/Remarks">
        <TextArea rows={3} />
      </FormItem>

      {/* Sensitization on Key CH Policies */}
      <FormItem label="Have you been sensitized on the latest key CH policies and guidelines (Confirm with meeting minutes/reports)">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>

      <FormItem label="Have you sensitized your CHAs on the latest key CH policies and guidelines (Confirm with meeting minutes/reports)">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>

      {/* Key Policies Dissemination */}
      <FormItem label="Have the following latest key CH policies and guidelines been disseminated? (Confirm with meeting minutes/reports)">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>

      {/* Comment */}
      <FormItem label="Comment">
        <TextArea rows={3} />
      </FormItem>
    </Form>
  );
};

export default CHUFunctionality;
