"use client"
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../providers";
import { FormItem } from "react-hook-form-antd";

import { Form, Radio } from 'antd';
import { Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;
const { Group } = Radio
const RadioGroup = Group;

const Finance = (props) => {
  const disabled = props.disabled || false;

  const store = useContext(AppContext);

  const { control, getValues, reset } = useForm({});

  useEffect(() => {
    return () => {
      props.setGlobalState((store) => {
        store["finance"] = getValues();
        return store;
      });
    };
  }, [getValues, props]);
  useEffect(() => {
    reset(store?.globalState?.finance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form layout="vertical">
      <Title level={2}>Finance</Title>
      <FormItem disabled={disabled} control={control} name="have_committed_financial_resources" required label="Have you committed financial resources through budgeting process to support community health? (Verify with budgets, etc)">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem disabled={disabled} control={control} name="comments_remarks_finance_1" required label="Comment/Remarks">
        <TextArea rows={3} size={'large'} placeholder='Please enter comments or remarks' />
      </FormItem>
      <FormItem disabled={disabled} control={control} name="what_portion_allocated" required label="What proportion of the county health budget is allocated to CHS? (verify)">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem disabled={disabled} control={control} name="comments_remarks_finance_2" required label="Comment/Remarks">
        <TextArea rows={3} size={'large'} placeholder='Please enter comments or remarks' />
      </FormItem>
    </Form>
  );
};

export default Finance;
