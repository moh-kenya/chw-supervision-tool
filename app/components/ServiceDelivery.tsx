'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';

import { Card, Col, Form, InputNumber, Row, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;

const ServiceDelivery = (props: any) => {
  const { store } = props;
  const { disabled } = props;
  const [percentage, setPercentage] = useState(0);
  const [proportion, setProportion] = useState(0);

  const { control, getValues, reset, watch } = useForm({});

  useEffect(() => {
    return () => {
      props.setGlobalState((store: any) => {
        store.serviceDelivery = getValues();
        return store;
      });
    };
  }, [getValues, props]);
  useEffect(() => {
    reset(store?.globalState?.serviceDelivery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const established = Number(watch('no_of_hhs_reigstered_in_echis'));
    const expected = Number(watch('total_number_of_hhs'));
    const visited = Number(watch('no_of_hhs_visited_last_month'));
    const getPercentage = (established / expected) * 100;
    const getProportion = (visited / expected) * 100;
    if (!Number.isNaN(getPercentage)) {
      setPercentage(Number(getPercentage.toFixed(2)));
    }
    if (!Number.isNaN(getProportion)) {
      setProportion(Number(getProportion.toFixed(2)));
    }
  }, [watch]);
  return (
    <Form layout="vertical">
      <Title level={2}>Service Delivery</Title>
      <FormItem
        disabled={disabled}
        label="Total Number of Households"
        control={control}
        name="total_number_of_hhs"
      >
        <InputNumber
          required
          min={0}
          size="large"
          style={{ width: '50%' }}
          placeholder="Please enter No. of expected CHUs"
        />
      </FormItem>
      <FormItem
        disabled={disabled}
        label="Number of households registered in eCHIS"
        control={control}
        name="no_of_hhs_reigstered_in_echis"
      >
        <InputNumber
          required
          min={0}
          size="large"
          style={{ width: '50%' }}
          placeholder="Please enter No. of CHUs established"
        />
      </FormItem>
      <FormItem
        disabled={disabled}
        label="Number of households visited last month"
        control={control}
        name="no_of_hhs_visited_last_month"
      >
        <InputNumber
          required
          min={0}
          size="large"
          style={{ width: '50%' }}
          placeholder="Please enter No. of CHUs established"
        />
      </FormItem>
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col>
          <Card
            title="Percentage of households registration in eCHIS"
            style={{ width: 450, height: 200 }}
          >
            <p style={{ fontSize: '50px', textAlign: 'center', marginTop: -5 }}>
              {percentage}%
            </p>
          </Card>
        </Col>
        <Col>
          <Card
            title="Proportion of households visited"
            style={{ width: 320, height: 200 }}
          >
            <p style={{ fontSize: '50px', textAlign: 'center', marginTop: -5 }}>
              {proportion}%
            </p>
          </Card>
        </Col>
      </Row>
      <FormItem
        disabled={disabled}
        control={control}
        required
        label="Comment/Remarks"
        name="post_cda_plan_implemented_comments"
      >
        <TextArea rows={3} size="large" placeholder="Comment/Remarks" />
      </FormItem>
      <FormItem
        disabled={disabled}
        control={control}
        required
        label="Number of community dialogues conducted in the last quarter"
        name="dialogues_conducted_in_last_quarter"
      >
        <InputNumber
          required
          min={0}
          size="large"
          style={{ width: '50%' }}
          placeholder="Please enter No."
        />
      </FormItem>
      {/* <FormItem disabled={disabled} control={control} name="have_functional_cmpdsr" required label="Do you have functional Community Maternal and Perinatal Deaths Surveillance and Response (cMPDSR) committee? (Verify with the latest meeting minutes)">
        <RadioGroup>
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem> */}

      <FormItem
        disabled={disabled}
        control={control}
        name="comment_remarks_service_delivery"
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

export default ServiceDelivery;
