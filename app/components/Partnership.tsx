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

const Partnership = (props) => {
  const disabled = props.disabled;
  const store = useContext(AppContext);

  const { control, getValues, reset } = useForm({});

  useEffect(() => {
    return () => {
      props.setGlobalState((store) => {
        store["partnership"] = getValues();
        return store;
      });
    };
  }, [getValues, props]);
  useEffect(() => {
    reset(store?.globalState?.partnership);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form layout="vertical">
      <Title level={2}>Partnership</Title>
      <FormItem disabled={disabled} control={control} name="have_phc_chs_stakeholder_forum" required label="Do you have a PHC/CHS stakeholder forum/TWG with clear TORs (defining the scope of work)?">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem disabled={disabled} control={control} name="convened_phc_chs_stakeholder_forum" required label="In the last quarter did you convene the PHC/CHS stakeholder forum/TWG? (Verify with reports)">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem disabled={disabled} control={control} name="comments_partnership" required label="Comment/Remarks">
        <TextArea rows={3} size={'large'} placeholder='Please enter comments or remarks' />
      </FormItem>
    </Form>
  );
};

export default Partnership;
