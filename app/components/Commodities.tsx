"use client"
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../providers";
import { FormItem } from "react-hook-form-antd";

import { Form, InputNumber, Radio } from 'antd';
import { Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;
const { Group } = Radio
const RadioGroup = Group;

const Commodities = (props) => {
  const disabled = props.disabled || false;

  const store = useContext(AppContext);

  const { control, getValues, reset } = useForm({});

  useEffect(() => {
    return () => {
      props.setGlobalState((store) => {
        store["commodities"] = getValues();
        return store;
      });
    };
  }, [getValues, props]);
  useEffect(() => {
    reset(store?.globalState?.commodities);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form layout="vertical">
      <Title level={2}>Commodities</Title>
      <FormItem disabled={disabled} control={control} name="all_chps_kitted" required label="Are all your CHPs kitted? (verify with the issuance inventory/S11)">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem disabled={disabled} control={control} name="no_not_kitted" required label="No. of CHPs not kitted">
        <InputNumber required min={0} size={'large'} style={{ width: "50%" }} placeholder='Please enter No.' />
      </FormItem>

      <FormItem disabled={disabled} control={control} name="comments_commodities_1" required label="Comment/Remarks">
        <TextArea rows={3} size={'large'} placeholder='Please enter comments or remarks' />
      </FormItem>

      <FormItem disabled={disabled} control={control} name="last_mile_distribution_reached" required label="Have you reached last mile distribution for the CHP Kits?">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem disabled={disabled} control={control} name="comments_commodities_2" required label="Comment/Remarks">
        <TextArea rows={3} size={'large'} placeholder='Please enter comments or remarks' />
      </FormItem>
    </Form>
  );
};

export default Commodities;
