"use client"
import React from 'react';
import { Form, InputNumber, Checkbox } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;

const Commodities = () => {
  return (
    <Form layout="vertical">
      <Title level={2}>Commodities</Title>
      <FormItem label="Are all your CHPs kitted? (verify with the issuance inventory/S11)">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>

      {/* No. of CHPs not kitted */}
      <FormItem label="No. of CHPs not kitted">
        <InputNumber min={0} />
      </FormItem>

      {/* Comment/Remarks */}
      <FormItem label="Comment/Remarks">
        <TextArea rows={3} />
      </FormItem>

      {/* Last Mile Distribution */}
      <FormItem label="Have you reached last mile distribution for the CHP Kits?">
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

export default Commodities;
