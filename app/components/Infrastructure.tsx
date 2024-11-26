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

const Infrastructure = (props) => {
  const disabled = props.disabled || false;
  const store = useContext(AppContext);

  const { control, getValues, reset } = useForm({});

  useEffect(() => {
    return () => {
      props.setGlobalState((store) => {
        store["Infrastructure"] = getValues();
        return store;
      });
    };
  }, [getValues, props]);
  useEffect(() => {
    reset(store?.globalState?.Infrastructure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Form layout="vertical">
      <Title level={2}>Infrastructure</Title>
      {/* Designated Office */}
      <FormItem disabled={disabled} control={control} name="have_designated_office" required label="Do all your CHUs have designated office?">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem disabled={disabled} control={control} name="comments_infrastructure_1" required label="Comment/Remarks">
        <TextArea rows={3} size={'large'} placeholder='Please enter comments or remarks' />
      </FormItem>

      {/* ICT Infrastructure */}
      <FormItem disabled={disabled} control={control} name="has_access_to_ict_infra" required label="Do all your CHUs have access to the ICT infrastructure (Desktop/Laptop & Internet)?">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem disabled={disabled} control={control} name="comments_infrastructure_2" required label="Comment/Remarks">
        <TextArea rows={3} size={'large'} placeholder='Please enter comments or remarks' />
      </FormItem>

      {/* Inventory Document for CH Office */}
      <FormItem disabled={disabled} control={control} name="have_inventory_document" required label="Do you have an inventory document for CH office?">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>

      {/* Up-to-date Inventory of CHS Equipment */}
      <FormItem disabled={disabled} control={control} name="upto_date_inventory_chs_equipment" required label="Do you have an up-to-date inventory of all the CHS equipment? (e.g., CHP kits, Mobile phones etc—confirm with the inventory document)">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem disabled={disabled} control={control} name="comments_infrastructure_3" label="Comment">
        <TextArea rows={3} size={'large'} />
      </FormItem>

    </Form>
  );
};

export default Infrastructure;
