"use client";
import React, { useContext, useEffect, useState } from 'react';
<<<<<<< HEAD
import { Form, InputNumber, Card, Row, Col, Radio, Checkbox } from 'antd';
=======
import { Form, InputNumber, Card, Row, Col, Radio, Spin } from 'antd';
>>>>>>> origin/main
import { FormItem } from "react-hook-form-antd";
import { Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useForm } from 'react-hook-form';
import { AppContext } from '../providers';
import { LoadingOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Group } = Radio;
const RadioGroup = Group;

const CHUFunctionality = (props) => {
  const disabled = props.disabled;
  const store = useContext(AppContext);
  const { globalState } = store || {};
  const [percentage, setPercentage] = useState(0)
  const { superVisionTeam, chuFunctionality } = globalState || {};
  const { whoAreRespondents } = superVisionTeam || {};
  const [respondents, setRespondents] = useState([]);
<<<<<<< HEAD
  const { getValues, watch, reset, control, setValue } = useForm({});
=======
  const { getValues, watch, reset, control } = useForm({
  });
  useEffect(() => {
    const established = Number(watch('no_established_chus'));
    const expected = Number(watch('expected_no_of_chus'));
    const getPercentage = established / expected * 100;
    if (!isNaN(getPercentage)) {
      setPercentage(getPercentage);
    }
  }, [watch])
>>>>>>> origin/main
  const allvalues = watch();

  useEffect(() => {
    return () => {
      props.setGlobalState((store) => {
        store["chuFunctionality"] = getValues();
        return store;
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setRespondents(whoAreRespondents);
  }, [whoAreRespondents]);

  useEffect(() => {
<<<<<<< HEAD
    reset(chuFunctionality);
  }, []);

  const [showComment, setShowComment] = useState(false);

  return (
    <Form layout="vertical">
      <Title level={2}>Leadership & Governance</Title>
      <Title level={5}>Operationalizing CHUs</Title>

     
=======
    reset(chuFunctionality)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Form layout="vertical">
      <Title level={2}>Leadership & Governance</Title>
      <Title level={4}>Community Health Units structures in place</Title>
      <FormItem disabled={disabled} label="Expected No of CHUs:" control={control} name='expected_no_of_chus'>
        <InputNumber required min={0} size={'large'} style={{ width: "50%" }} placeholder='Please enter No. of expected CHUs' />
      </FormItem>
      <FormItem disabled={disabled} label="No. of CHUs established:" control={control} name='no_established_chus'>
        <InputNumber required min={0} size={'large'} style={{ width: "50%" }} placeholder='Please enter No. of CHUs established' />
      </FormItem>
>>>>>>> origin/main
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col>
          <Card title="Percentage of establishment of CHU is:">
            <p style={{ fontSize: '50px', textAlign: 'center', marginTop: -5 }}>
              {percentage}%</p>
          </Card>
        </Col>
      </Row>

<<<<<<< HEAD
     
      <FormItem label="Comments/Remarks" control={control} name='community_health_structures_remarks'>
=======
      <FormItem disabled={disabled} label="Comments/Remarks" control={control} name='community_health_structures_remarks'>
>>>>>>> origin/main
        <TextArea rows={4} size={'large'} placeholder='Please enter comments or remarks' />
      </FormItem>

      
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col>
          <Card title="No of CHUs registered in MCHUL" style={{ width: 300, height: 200 }}>
            <p style={{ fontSize: '50px', textAlign: 'center', marginTop: -5 }}> <Spin indicator={<LoadingOutlined spin />} size="large" /></p>
          </Card>
        </Col>
      </Row>
      <FormItem disabled={disabled} label="Comments/Remarks" control={control} name="number_of_chu_remarks">
        <TextArea rows={4} size={'large'} placeholder='Please enter comments or remarks' />
      </FormItem>
<<<<<<< HEAD

      <Title level={5}>Functionality of CHUs </Title>
    
      <FormItem control={control} name='conducted_assessment_last_12_months' label="Have you conducted CHU functionality assessment in the last 12 months? (Verify with reports/minutes)">
=======
      <Title level={4}>Functionality of CHUs </Title>
      <Title level={5}>Functionality Assessment of CHUs done:</Title>
      <FormItem
        control={control}
        disabled={disabled}
        name='conducted_assessment_last_12_months'
        label="Have you conducted CHU functionality assessment in the last 12 months? (Verify with reports/minutes)">
>>>>>>> origin/main
        <RadioGroup>
          <Radio value={'yes'}>Yes, all CHUs assessed</Radio>
          <Radio value={'partly'}>Partly, some CHUs assessed</Radio>
          <Radio value={'no'}>No, No CHU assessed</Radio>
        </RadioGroup>
      </FormItem>
<<<<<<< HEAD

     
      <FormItem required label="Comment/Remarks" control={control} name='conducted_assessment_last_12_months_remarks'>
=======
      <FormItem disabled={disabled} required label="Comment/Remarks" control={control}
        name='conducted_assessment_last_12_months_remarks'>
>>>>>>> origin/main
        <TextArea rows={3} size={'large'} placeholder='Please enter comments or remarks for if you have conducted CHU functionality assessment in the last 12 months?' />
      </FormItem>

      {allvalues["conducted_assessment_last_12_months"] !== 'no' && (
        <>
          <Title level={5}>Based on the CHU functionality assessment report</Title>
          <Row gutter={[16, 16]}>
            <Col>
<<<<<<< HEAD
              <FormItem required label="Enter total No of assessed CHUs" control={control} name='total_chus_assessed'>
=======
              <FormItem disabled={disabled} required label="Enter total No of assessed CHUs" control={control}
                name='total_chus_assessed'>
>>>>>>> origin/main
                <InputNumber required min={0} style={{ width: '100%' }} size="large" placeholder='Enter No.' />
              </FormItem>
            </Col>
            <Col>
<<<<<<< HEAD
              <FormItem required name='fully_functional_chus' label="Enter No of fully-functional CHUs" control={control}>
=======
              <FormItem
                disabled={disabled}
                required name='fully_functional_chus'
                label="Enter No of fully-functional CHUs" control={control}>
>>>>>>> origin/main
                <InputNumber required min={0} style={{ width: '100%' }} size="large" placeholder='Enter No.' />
              </FormItem>
            </Col>
            <Col>
<<<<<<< HEAD
              <FormItem required name='semi_functional_chus' label="Enter No of Semi-functional CHUs" control={control}>
=======
              <FormItem
                disabled={disabled}
                required name='semi_functional_chus'
                label="Enter No of Semi-functional CHUs" control={control}>
>>>>>>> origin/main
                <InputNumber required min={0} style={{ width: '100%' }} size="large" placeholder='Enter No.' />
              </FormItem>
            </Col>
            <Col>
<<<<<<< HEAD
              <FormItem required name='non_functional_chus' label="Enter No of Non-functional CHUs" control={control}>
=======
              <FormItem
                disabled={disabled}
                required name='non_functional_chus'
                label="Enter No of Non-functional CHUs" control={control}>
>>>>>>> origin/main
                <InputNumber required min={0} style={{ width: '100%' }} size="large" placeholder='Enter No.' />
              </FormItem>
            </Col>
          </Row>
        </>
      )}


      {respondents?.length > 0 && (
        <>
          <Title level={4}>WorkPlan & Performance</Title>
          {["CEC", "COH", "CDH", "CCHSFP", "CDSC", "CHRIO", "CPHCC", "CQIC"].some(value => respondents?.includes(value)) && (
            <FormItem
              disabled={disabled}
              name='chs_integrated_cawp'
              label="Are Community Health services integrated in the current county annual workplan? (Confirm with the AWP)"
              control={control}
            >
              <RadioGroup>
                <Radio value={'yes'}>Yes</Radio>
                <Radio value={'no'}>No</Radio>
              </RadioGroup>
            </FormItem>
          )}

          {["SCMOH", "SCCHSFP", "SCDSC", "SCHRIO"].some(value => respondents?.includes(value)) && (
            <FormItem
              disabled={disabled}
              name='chs_integrated_scawp'
              control={control}
              label="Are Community Health services integrated in the current sub-county annual workplan? (Confirm with the AWP)"
            >
              <RadioGroup>
                <Radio value={'yes'}>Yes</Radio>
                <Radio value={'no'}>No</Radio>
              </RadioGroup>
            </FormItem>
<<<<<<< HEAD
          )}

          {["CEC", "COH", "CDH", "CCHSFP", "CDSC", "CHRIO", "CPHCC", "CQIC"].some(value => respondents?.includes(value)) && (
            <>
              <FormItem
                name='year5_costed_chs_ip'
                control={control}
                label="Do you have a 5-year costed CHS implementation plan?"
              >
                <RadioGroup>
                  <Radio value={'yes'}>Yes</Radio>
                  <Radio value={'no'}>No</Radio>
                </RadioGroup>
              </FormItem>

              {allvalues["year5_costed_chs_ip"] === 'no' && (
=======
          }
          {["CEC", "COH", "CDH", "CCHSFP", "CDSC", "CHRIO", "CPHCC", "CQIC"].some(value => respondents?.includes(value)) &&
            <> <FormItem
              disabled={disabled}
              name='year5_costed_chs_ip'
              control={control} label="Do you have a 5-year costed CHS implementation plan?">
              <RadioGroup>
                <Radio value={'yes'}>Yes</Radio>
                <Radio value={'no'}>No</Radio>
              </RadioGroup>
            </FormItem>
              {allvalues["year5_costed_chs_ip"] === 'no' &&
>>>>>>> origin/main
                <FormItem
                  disabled={disabled}
                  name='year5_costed_chs_ip_remarks'
                  control={control}
                  label="Comments/Remarks"
                >
                  <TextArea rows={3} size={'large'} placeholder='Please enter comments or remarks for not having a 5-year costed CHS implementation plan' />
                </FormItem>
              )}

              <FormItem
<<<<<<< HEAD
                required
                name='sentitized_latest_key_cch'
                control={control}
                label="Have you been sensitized on the latest key CH policies and guidelines (Confirm with meeting minutes/reports)"
              >
=======
                disabled={disabled}
                required name='sentitized_latest_key_cch'
                control={control} label="Have you been sensitized on the latest key CH policies and guidelines (Confirm with meeting minutes/reports)">
>>>>>>> origin/main
                <RadioGroup>
                  <Radio value={'yes'}>Yes</Radio>
                  <Radio value={'no'}>No</Radio>
                </RadioGroup>
              </FormItem>

              <FormItem
<<<<<<< HEAD
                required
                name='sentitized_latest_key_cch_chas'
                control={control}
                label="Have you sensitized your CHAs on the latest key CH policies and guidelines (Confirm with meeting minutes/reports)"
              >
=======
                disabled={disabled}
                required name='sentitized_latest_key_cch_chas'
                control={control} label="Have you sensitized your CHAs on the latest key CH policies and guidelines (Confirm with meeting minutes/reports)">
>>>>>>> origin/main
                <RadioGroup>
                  <Radio value={'yes'}>Yes</Radio>
                  <Radio value={'no'}>No</Radio>
                </RadioGroup>
              </FormItem>
            </>
          )}

          
          {["CEC", "COH", "CDH", "CCHSFP", "CDSC", "CHRIO", "CPHCC", "CQIC", "SCMOH", "SCCHSFP", "SCDSC", "SCHRIO"].some(value => respondents?.includes(value)) && (
            <FormItem
<<<<<<< HEAD
              name="latest_chpolicies_disseminated"
              control={control}
              label="Have the following latest key CH policies and guidelines been disseminated? (Confirm with meeting minutes/reports & verify access to the policies/guidelines)"
              rules={[{ required: true, message: "Please select at least one policy or guideline." }]}
            >
              <Checkbox.Group
                options={[
                  "Community Health Policy (2020-2030)",
                  "Community Health Strategy (2020-2025)",
                  "Primary Health Care Act 2023",
                  "KQMCH Standards for Level 1"
                ]}
              />
            </FormItem>
          )}
        </>
      )}
=======
              disabled={disabled}
              name='latest_chpolicies_disseminated'
              control={control} label="Have the following latest key CH policies and guidelines been disseminated? (Confirm with meeting minutes/reports)">
              <RadioGroup>
                <Radio value={'yes'}>Yes</Radio>
                <Radio value={'no'}>No</Radio>
              </RadioGroup>
            </FormItem>}
          <FormItem
            disabled={disabled}
            name='comments_awp'
            control={control} label="Comment">
            <TextArea rows={3} size={'large'} placeholder='Please enter comments or remarks' />
          </FormItem>
        </>}
>>>>>>> origin/main
    </Form>
  );
};

export default CHUFunctionality;
