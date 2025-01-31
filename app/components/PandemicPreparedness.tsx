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

const PandemicPreparedness = (props) => {
  const { disabled } = props;

  const store = useContext(AppContext);
  const [form] = Form.useForm();

  const { control, getValues, reset } = useForm({});

  useEffect(() => {
    return () => {
      props.setGlobalState((store) => {
        store.pandemicPreparedness = getValues();
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
        label="Presence of a functional pandemic preparedness and response team (verify with minutes)"
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
        name="presence_of_functional_pandemic_preparedness_comment"
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
        name="existence_of_pandemic_preparedness"
        label="Existence of Pandemic Preparedness plan (Verify availability finance/resource mobilization plan, Risk Communication and Community Engagement (RCCE) plan)"
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
        name="existence_of_pandemic_preparedness_comment"
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
        name="dedicated_budget"
        control={control}
        label="Dedicated budget for pandemic response (verify)"
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
        name="dedicated_budget_comment"
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
        name="pandemic_preparedness"
        control={control}
        label="Pandemic Preparedness Stakeholder Co-ordination mechanism in place (verify with minutes)"
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
        name="pandemic_preparedness_comment"
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

export default PandemicPreparedness;
