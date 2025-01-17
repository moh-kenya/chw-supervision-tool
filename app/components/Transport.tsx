'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';

import { Form, Radio, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;
const { Group } = Radio;
const RadioGroup = Group;

const Transport = (props) => {
  const { store } = props;
  const disabled = props.disabled || false;

  const { control, getValues, reset } = useForm({});

  useEffect(() => {
    return () => {
      props.setGlobalState((store) => {
        store.transport = getValues();
        return store;
      });
    };
  }, [getValues, props]);
  useEffect(() => {
    reset(store?.globalState?.transport);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Form layout="vertical">
      <Title level={2}>Transport</Title>
      <FormItem
        disabled={disabled}
        required
        control={control}
        name="facilitated_with_transport"
        label="Have you facilitated your CHAs/CHOs with a means of transport (Motorbike/Bicycles)?"
      >
        <RadioGroup>
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem
        disabled={disabled}
        required
        control={control}
        name="comments_transport_1"
        label="Comment/Remarks"
      >
        <TextArea
          rows={3}
          size="large"
          placeholder="Please enter comments or remarks"
        />
      </FormItem>

      <FormItem
        disabled={disabled}
        required
        control={control}
        name="have_budget_for_maintenance_transport"
        label="Do you have a budget for maintenance of the provided transport means (Servicing & fueling)? (Verify)"
      >
        <RadioGroup>
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem
        disabled={disabled}
        required
        control={control}
        name="comments_transport_2"
        label="Comment/Remarks"
      >
        <TextArea
          rows={3}
          size="large"
          placeholder="Please enter comments or remarks"
        />
      </FormItem>
    </Form>
  );
};

export default Transport;
