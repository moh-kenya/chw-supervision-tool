'use client';

import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';

import { Form, Radio, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { AppContext } from '../providers';

const { Title } = Typography;
const { Group } = Radio;
const RadioGroup = Group;

const Referral = (props) => {
  const disabled = props.disabled || false;
  const store = useContext(AppContext);

  const { control, getValues, reset } = useForm({});

  useEffect(() => {
    return () => {
      props.setGlobalState((store) => {
        store.referral = getValues();
        return store;
      });
    };
  }, [getValues, props]);
  useEffect(() => {
    reset(store?.globalState?.referral);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Form layout="vertical">
      <Title level={2}>Referral</Title>
      <FormItem
        disabled={disabled}
        control={control}
        name="supplied_chps_with_referral_tools"
        label="Have you supplied all your CHPs with referral tools?"
        rules={[{ required: true, message: 'Please select an option' }]}
      >
        <RadioGroup>
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem
        control={control}
        disabled={disabled}
        name="comments_referral"
        required
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

export default Referral;
