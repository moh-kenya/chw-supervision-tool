"use client"
import React from 'react';
import { Form, Checkbox } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;

const Partnership = () => {
  return (
    <Form layout="vertical">
      <Title level={2}>Partnership</Title>
      <FormItem label="Do you have a PHC/CHS stakeholder forum/TWG with clear TORs (defining the scope of work)?">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>
      {/* Last Mile Distribution */}
      <FormItem label="In the last quarter did you convene the PHC/CHS stakeholder forum/TWG? (Verify with reports)">
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

export default Partnership;
