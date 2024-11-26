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

const ServiceDelivery = (props) => {
  const disabled = props.disabled;
  const store = useContext(AppContext);

  const { control, getValues, reset } = useForm({});

  useEffect(() => {
    return () => {
      props.setGlobalState((store) => {
        store["serviceDelivery"] = getValues();
        return store;
      });
    };
  }, [getValues, props]);
  useEffect(() => {
    reset(store?.globalState?.serviceDelivery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Form layout="vertical">
      <Title level={2}>Service Delivery</Title>
      <FormItem disabled={disabled} control={control} name="have_functional_cmpdsr" required label="Do you have functional Community Maternal and Perinatal Deaths Surveillance and Response (cMPDSR) committee? (Verify with the latest meeting minutes)">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem disabled={disabled} control={control} name="comment_remarks_service_delivery" required label="Comment/Remarks">
        <TextArea rows={3} size={'large'} placeholder='Please enter comments or remarks' />
      </FormItem>
    </Form>
  );
};

export default ServiceDelivery;
