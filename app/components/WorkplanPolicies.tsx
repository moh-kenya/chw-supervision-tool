"use client"
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../providers";
import { FormItem } from "react-hook-form-antd";

import { Form, Input, InputNumber, Radio } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;
const { Group } = Radio
const RadioGroup = Group;

const WorkplanPolicies = (props) => {
  const disabled = props.disabled || false;

  const store = useContext(AppContext);

  const { control, getValues, reset } = useForm({});

  useEffect(() => {
    return () => {
      props.setGlobalState((store) => {
        store["workplanPolicies"] = getValues();
        return store;
      });
    };
  }, [getValues, props]);
  useEffect(() => {
    reset(store?.globalState?.workplanPolicies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Form layout="vertical">
      <Title level={2}>Workforce</Title>
      <FormItem disabled={disabled} control={control} name="expected_no_of_chas" required label="Expected No of CHAs/CHOs is">
        <InputNumber required min={0} size='large' style={{ width: "50%" }} placeholder='Please enter No.' />
      </FormItem>

      <FormItem disabled={disabled} control={control} name="how_many_chas" required label="How many CHAs/CHOs do you have?">
        <InputNumber required min={0} size='large' style={{ width: "50%" }} placeholder='Please enter No.' />
      </FormItem>

      <FormItem disabled={disabled} control={control} name="comments_workplanpolicies_1" label="Comment/Remarks">
        <Input.TextArea rows={3} size='large' placeholder='Please enter comments or remarks' />
      </FormItem>

      <FormItem disabled={disabled} control={control} name="number_of_chas_trained" required label="Number of CHAs/CHOs trained in community health? (at least 2 years training in certified college)">
        <InputNumber required min={0} size='large' style={{ width: "50%" }} placeholder='Please enter No.' />
      </FormItem>

      <FormItem disabled={disabled} control={control} name="comments_workplanpolicies_2" label="Comment/Remarks">
        <Input.TextArea rows={3} size='large' placeholder='Please enter comments or remarks' />
      </FormItem>

      <FormItem disabled={disabled} control={control} name="number_of_chas_appraised" required label="Number of CHAs appraised in the last financial year? (verify with appraisal reports)">
        <InputNumber required min={0} size='large' style={{ width: "50%" }} placeholder='Please enter No.' />
      </FormItem>

      <FormItem disabled={disabled} control={control} name="comments_workplanpolicies_3" label="Comment">
        <Input.TextArea rows={3} size='large' placeholder='Please enter comment' />
      </FormItem>

      {/* CHPs Section */}
      <FormItem disabled={disabled} control={control} name="expected_no_of_chps" required label="Expected No of CHPs is">
        <InputNumber required min={0} size='large' style={{ width: "50%" }} placeholder='Please enter No.' />
      </FormItem>

      <FormItem disabled={disabled} control={control} name="number_of_existing_chps" required label="Number of existing CHPs">
        <InputNumber required min={0} size='large' style={{ width: "50%" }} placeholder='Please enter No.' />
      </FormItem>

      <FormItem disabled={disabled} control={control} name="comments_workplanpolicies_4" label="Comment">
        <Input.TextArea rows={3} size='large' placeholder='Please enter comment' />
      </FormItem>

      <FormItem disabled={disabled} control={control} name="stipends_payment_upto_date" required label="Is your CHPs stipends payment status up to date? (payments up to the last month. Both National, County)">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem disabled={disabled} control={control} name="months_in_arrears" required label="How many months in arrears?">
        <InputNumber required min={0} size='large' style={{ width: "50%" }} placeholder='Please enter No.' />
      </FormItem>

      <FormItem disabled={disabled} control={control} name="comments_workplanpolicies_4" required label="Comments">
        <Input.TextArea rows={3} size='large' placeholder='Please enter comments or remarks' />
      </FormItem>

      <FormItem disabled={disabled} control={control} name="chp_registry_upto_date" required label="Is your CHP Registry up to date? (new ones added, removed non-existent at least once a year)">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem disabled={disabled} control={control} name="comments_workplanpolicies_5" label="Comment">
        <Input.TextArea rows={3} size='large' style={{ width: "50%" }} placeholder='Please enter comment' />
      </FormItem>
      <FormItem disabled={disabled} control={control} name="chs_integrated_into_county_wp" required label="Are Community Health services integrated in the current county annual workplan?">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem disabled={disabled} control={control} name="chs_integrated_into_subcounty_wp" required label="Are Community Health services integrated in the current sub-county annual workplan?">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem disabled={disabled} control={control} name="5_year_costed_chs_plan" required label="Do you have a 5-year costed CHS implementation plan?">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem disabled={disabled} control={control} name="comments_workplanpolicies_6" label="Comments/Remarks">
        <Input.TextArea rows={4} size='large' placeholder='Please enter comments or remarks' />
      </FormItem>
    </Form>
  );
};

export default WorkplanPolicies;
