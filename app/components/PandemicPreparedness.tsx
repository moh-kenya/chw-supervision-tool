"use client"
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../providers";
import { FormItem } from "react-hook-form-antd";

import { Form, Radio } from 'antd';
import { Typography } from 'antd';
import TextArea from "antd/es/input/TextArea";

const { Title } = Typography;
const { Group } = Radio
const RadioGroup = Group;

const PandemicPreparedness = (props) => {

  const disabled = props.disabled;

  const store = useContext(AppContext);

  const { control, getValues, reset } = useForm({});

  useEffect(() => {
    return () => {
      props.setGlobalState((store) => {
        store["pandemicPreparedness"] = getValues();
        return store;
      });
    };
  }, [getValues, props]);
  useEffect(() => {
    reset(store?.globalState?.pandemicPreparedness);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Form layout="vertical">
      <Title level={2}>Pandemic Preparedness</Title>
      <FormItem
        disabled={disabled}
        control={control}
        name="presence_of_functional_pandemic_preparedness"
        required label="Presence of a functional pandemic preparedness and response team (verify with minutes)">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem disabled={disabled} control={control}
        name="presence_of_functional_pandemic_preparedness_comment" required label="Comment/Remarks">
        <TextArea rows={3} size={'large'} placeholder='Please enter comments or remarks' />
      </FormItem>
      <FormItem
        disabled={disabled}
        control={control}
        name="existence_of_pandemic_preparedness"
        required label="Existence of Pandemic Preparedness plan (Verify availability finance/resource mobilization plan,Risk Communication and Community Engagement (RCCE) plan)">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem disabled={disabled} control={control}
        name="existence_of_pandemic_preparedness_comment" required label="Comment/Remarks">
        <TextArea rows={3} size={'large'} placeholder='Please enter comments or remarks' />
      </FormItem>
      <FormItem
        disabled={disabled}
        name="dedicated_budget" control={control} required label="Dedicated budget for pandemic response (verify)">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem disabled={disabled} control={control} name="dedicated_budget_comment" required label="Comment/Remarks">
        <TextArea rows={3} size={'large'} placeholder='Please enter comments or remarks' />
      </FormItem>
      <FormItem disabled={disabled} name="pandemic_preparedness" control={control} required label="Pandemic Preparedness Stakeholder Co-ordination mechanism in place (verify with minutes)">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem disabled={disabled} control={control} name="pandemic_preparedness_comment" required label="Comment/Remarks">
        <TextArea rows={3} size={'large'} placeholder='Please enter comments or remarks' />
      </FormItem>
    </Form>
  );
};

export default PandemicPreparedness;
