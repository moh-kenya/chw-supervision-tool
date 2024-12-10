"use client"
import React, { useContext, useEffect, useState } from 'react';
import { Form, InputNumber, Card, Row, Col, Radio } from 'antd';
import { FormItem } from "react-hook-form-antd";
import { Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { AppContext } from '../new-supervision/page';
import { useForm } from 'react-hook-form';

const { Title } = Typography;
const { Group } = Radio
const RadioGroup = Group;

const CHUFunctionality = (props) => {
  const store = useContext(AppContext);
  const { globalState } = store;
  const { superVisionTeam, chuFunctionality } = globalState;
  const { whoAreRespondents } = superVisionTeam;
  const [respondents, setRespondents] = useState([]);
  const { getValues, watch, reset, control } = useForm({
  });
  const allvalues = watch();
  useEffect(() => {
    return () => {
      props.setGlobalState((store) => {
        store["chuFunctionality"] = getValues();
        return store;
      })
    };
  }, []);
  useEffect(() => {
    setRespondents(whoAreRespondents)
  }, [whoAreRespondents]);
  useEffect(() => {
    reset(chuFunctionality)
  }, [])
  return (
    <Form layout="vertical">
      <Title level={2}>Leadership & Governance</Title>
      <Title level={5}>Operationalizing CHUs</Title>
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col>
          <Card title="Expected No of CHUs:" style={{ width: 300, height: 200 }}>
            <p style={{ fontSize: '50px', textAlign: 'center', marginTop: -5 }}>45</p>
          </Card>
        </Col>
        <Col>
          <Card title="No. of CHUs established:" style={{ width: 300, height: 200 }}>
            <p style={{ fontSize: '50px', textAlign: 'center', marginTop: -5 }}>45</p>
          </Card>
        </Col>
        <Col>
          <Card title="% establishment of CHU" style={{ width: 300, height: 200 }}>
            <p style={{ fontSize: '50px', textAlign: 'center', marginTop: -5 }}>45</p>
          </Card>
        </Col>
      </Row>

      <FormItem label="Comments/Remarks" control={control} name='community_health_structures_remarks'>
        <TextArea rows={4} size={'large'} placeholder='Please enter comments or remarks' />
      </FormItem>
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col>
          <Card title="No of CHUs registered in MCHUL" style={{ width: 300, height: 200 }}>
            <p style={{ fontSize: '50px', textAlign: 'center', marginTop: -5 }}>45</p>
          </Card>
        </Col>
      </Row>
      <FormItem label="Comments/Remarks" control={control} name="number_of_chu_remarks">
        <TextArea rows={4} size={'large'} placeholder='Please enter comments or remarks' />
      </FormItem>
      <Title level={5}>Functionality of CHUs </Title>
      <FormItem
        control={control}
        name='conducted_assessment_last_12_months'
        label="Have you conducted CHU functionality assessment in the last 12 months? (Verify with reports/minutes)">
        <RadioGroup>
          <Radio value={'yes'}>Yes, all CHUs assessed</Radio>
          <Radio value={'partly'}>Partly, some CHUs assessed</Radio>
          <Radio value={'no'}>No, No CHU assessed</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem required label="Comment/Remarks" control={control}
        name='conducted_assessment_last_12_months_remarks'>
        <TextArea rows={3} size={'large'} placeholder='Please enter comments or remarks for if you have conducted CHU functionality assessment in the last 12 months?' />
      </FormItem>
      {allvalues["conducted_assessment_last_12_months"] !== 'no' &&
        <>
          <Title level={5}> Based on the CHU functionality assessment report</Title>

          <Row gutter={[16, 16]}>
            <Col>
              <FormItem required label="Enter total No of assessed CHUs" control={control}
                name='total_chus_assessed'>
                <InputNumber required min={0} style={{ width: '100%' }} size="large" placeholder='Enter No.' />
              </FormItem>
            </Col>
            <Col>
              <FormItem
                required name='fully_functional_chus'
                label="Enter No of fully-functional CHUs" control={control}>
                <InputNumber required min={0} style={{ width: '100%' }} size="large" placeholder='Enter No.' />
              </FormItem>
            </Col>
            <Col>
              <FormItem
                required name='semi_functional_chus'
                label="Enter No of Semi-functional CHUs" control={control}>
                <InputNumber required min={0} style={{ width: '100%' }} size="large" placeholder='Enter No.' />
              </FormItem>
            </Col>
            <Col>
              <FormItem
                required name='non_functional_chus'
                label="Enter No of Non-functional CHUs" control={control}>
                <InputNumber required min={0} style={{ width: '100%' }} size="large" placeholder='Enter No.' />
              </FormItem>
            </Col>
          </Row>
        </>}

      {respondents?.length > 0 &&
        <>
          <Title level={4}>Annual WorkPlan & Performance  </Title>
          {["CEC", "COH", "CDH", "CCHSFP", "CDSC", "CHRIO", "CPHCC", "CQIC"].some(value => respondents?.includes(value)) &&
            <FormItem
              name='chs_integrated_cawp'
              label="Are Community Health services integrated in the current county annual workplan? (Confirm with the AWP)" control={control}>
              <RadioGroup>
                <Radio value={'yes'}>Yes</Radio>
                <Radio value={'no'}>No</Radio>
              </RadioGroup>
            </FormItem>
          }
          {["SCMOH", "SCCHSFP", "SCDSC", "SCHRIO"].some(value => respondents?.includes(value)) &&
            <FormItem
              name='chs_integrated_scawp'
              control={control} label="Are Community Health services integrated in the current sub-county annual workplan? (Confirm with the AWP)">
              <RadioGroup>
                <Radio value={'yes'}>Yes</Radio>
                <Radio value={'no'}>No</Radio>
              </RadioGroup>
            </FormItem>
          }
          {["CEC", "COH", "CDH", "CCHSFP", "CDSC", "CHRIO", "CPHCC", "CQIC"].some(value => respondents?.includes(value)) &&
            <> <FormItem
              name='year5_costed_chs_ip'
              control={control} label="Do you have a 5-year costed CHS implementation plan?">
              <RadioGroup>
                <Radio value={'yes'}>Yes</Radio>
                <Radio value={'no'}>No</Radio>
              </RadioGroup>
            </FormItem>
              {allvalues["year5_costed_chs_ip"] === 'no' &&
                <FormItem
                  name='year5_costed_chs_ip_remarks'
                  control={control} label="Comments/Remarks">
                  <TextArea rows={3}
                    size={'large'} placeholder='Please enter comments or remarks for not having a 5-year costed CHS implementation plan' />
                </FormItem>
              }


              <FormItem
                required name='sentitized_latest_key_cch'
                control={control} label="Have you been sensitized on the latest key CH policies and guidelines (Confirm with meeting minutes/reports)">
                <RadioGroup>
                  <Radio value={'yes'}>Yes</Radio>
                  <Radio value={'no'}>No</Radio>
                </RadioGroup>
              </FormItem>

              <FormItem
                required name='sentitized_latest_key_cch_chas'
                control={control} label="Have you sensitized your CHAs on the latest key CH policies and guidelines (Confirm with meeting minutes/reports)">
                <RadioGroup>
                  <Radio value={'yes'}>Yes</Radio>
                  <Radio value={'no'}>No</Radio>
                </RadioGroup>
              </FormItem>
            </>}

          {["CEC", "COH", "CDH", "CCHSFP", "CDSC", "CHRIO", "CPHCC", "CQIC", "SCMOH", "SCCHSFP", "SCDSC", "SCHRIO"].some(value => respondents?.includes(value)) &&
            <FormItem
              name='latest_chpolicies_disseminated'
              control={control} label="Have the following latest key CH policies and guidelines been disseminated? (Confirm with meeting minutes/reports)">
              <RadioGroup>
                <Radio value={'yes'}>Yes</Radio>
                <Radio value={'no'}>No</Radio>
              </RadioGroup>
            </FormItem>}
          <FormItem
            name='comments_awp'
            control={control} label="Comment">
            <TextArea rows={3} size={'large'} placeholder='Please enter comments or remarks' />
          </FormItem>
        </>}
    </Form>
  );
};

export default CHUFunctionality;
