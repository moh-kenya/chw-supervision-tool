"use client"
import React, { useContext, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { FormItem } from "react-hook-form-antd";

import { Form, Radio } from 'antd';
import { Typography } from 'antd';
import { AppContext } from "../providers";

const { Title } = Typography;
const { Group } = Radio
const RadioGroup = Group;

const MonitoringAndEvaluation = (props) => {
  const disabled = props.disabled || false;
  const store = useContext(AppContext);

  const { control, getValues, reset } = useForm({});

  useEffect(() => {
    return () => {
      props.setGlobalState((store) => {
        store["monitoringAndEvalutation"] = getValues();
        return store;
      });
    };
  }, [getValues, props]);
  useEffect(() => {
    reset(store?.globalState?.monitoringAndEvalutation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Form layout="vertical">
        <Title level={2}>Monitoring & Evaluation</Title>
        <FormItem disabled={disabled} control={control} name="integrated_dqa_conducted" required label="Have you conducted an integrated Community DQA in the last 6 months? (Verify with cDQA report- either external/internal)">
          <RadioGroup>
            <Radio value={'yes'}>Yes</Radio>
            <Radio value={'no'}>No</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem disabled={disabled} control={control} name="post_cda_plan_implemented" required label="Was the post-cDQA action plan implemented? (Verify with action plan document & supporting activities minutes/reports)">
          <RadioGroup>
            <Radio value={'yes'}>Yes</Radio>
            <Radio value={'no'}>No</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </>
  );
};

export default MonitoringAndEvaluation;
