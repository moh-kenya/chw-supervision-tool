'use client';

import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';

import { Form, InputNumber, Radio, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { AppContext } from '../providers';

const { Title } = Typography;
const { Group } = Radio;
const RadioGroup = Group;



const Commodities = (props) => {
  const disabled = props.disabled || false;

  const store = useContext(AppContext);

  const { control, getValues, reset } = useForm({});

  useEffect(() => {
    return () => {
      props.setGlobalState((store) => {
        store.commodities = getValues();
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
      <Form.Item
        name="all_chps_kitted"
        label="Are all your CHPs kitted? (verify with the issuance inventory/S11)"
        rules={[{ required: true, message: 'Please select an option!' }]}
      >
        <Radio.Group>
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="no_not_kitted"
        label="No. of CHPs not kitted"
        rules={[
          {
            required: true,
            message: 'Please enter the number of CHPs not kitted!',
          },
        ]}
      >
        <InputNumber
          min={0}
          size="large"
          style={{ width: '50%' }}
          placeholder="Please enter No."
        />
      </Form.Item>

      <FormItem
        disabled={disabled}
        control={control}
        name="comments_commodities_1"
        required
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
        control={control}
        name="last_mile_distribution_reached"
        label="Have you reached last mile distribution for the CHP Kits?"
        rules={[
          {
            required: true,
            message: 'Please select an option',
          },
        ]}
      >
        <RadioGroup>
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem
        disabled={disabled}
        control={control}
        name="comments_commodities_2"
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

export default Commodities;
