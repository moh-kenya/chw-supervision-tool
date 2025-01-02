"use client";
import React, { useContext, useEffect, useState } from "react";
import { Form, InputNumber, Card, Row, Col, Radio, Checkbox, Typography, Spin} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useForm } from "react-hook-form";
import { AppContext } from "../providers";
import { LoadingOutlined } from "@ant-design/icons";
import { FormItem } from "react-hook-form-antd";




const { Title } = Typography;
const { Group: RadioGroup } = Radio;

const CHUFunctionality = (props) => {
  const { disabled } = props;
  const store = useContext(AppContext);
  const { globalState } = store || {};
  const [percentage, setPercentage] = useState(0);
  const [respondents, setRespondents] = useState([]);
  const { superVisionTeam, chuFunctionality } = globalState || {};
  const { whoAreRespondents } = superVisionTeam || {};
  const { getValues, watch, reset, control, setValue } = useForm();

  useEffect(() => {
    reset(chuFunctionality);
  }, [chuFunctionality, reset]);

  useEffect(() => {
    const subscription = watch((values) => {
      const established = Number(values.no_established_chus);
      const expected = Number(values.expected_no_of_chus);
      const calculatedPercentage = (established / expected) * 100;
      if (!isNaN(calculatedPercentage)) {
        setPercentage(calculatedPercentage);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    setRespondents(whoAreRespondents || []);
  }, [whoAreRespondents]);

  useEffect(() => {
    return () => {
      props.setGlobalState((store) => {
        store["chuFunctionality"] = getValues();
        return store;
      });
    };
  }, [getValues, props]);

  const allvalues = watch();

  return (
    <Form layout="vertical">
      <Title level={2}>Leadership & Governance</Title>
      <Title level={4}>Operationalizing CHUs</Title>

      <Form.Item label="Expected No of CHUs:" required>
        <Form.Item name="expected_no_of_chus">
          <InputNumber
            min={0}
            size="large"
            style={{ width: "50%" }}
            placeholder="Please enter No. of expected CHUs"
            disabled={disabled}
          />
        </Form.Item>
      </Form.Item>

      <Form.Item label="No. of CHUs established:" required>
        <Form.Item name="no_established_chus">
          <InputNumber
            min={0}
            size="large"
            style={{ width: "50%" }}
            placeholder="Please enter No. of CHUs established"
            disabled={disabled}
          />
        </Form.Item>
      </Form.Item>

      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col>
          <Card title="Percentage of establishment of CHU is:">
            <p style={{ fontSize: "50px", textAlign: "center", marginTop: -5 }}>
              {percentage.toFixed(2)}%
            </p>
          </Card>
        </Col>
      </Row>

      <Form.Item label="Comments/Remarks" required>
        <Form.Item name="community_health_structures_remarks">
          <TextArea
            rows={4}
            size="large"
            placeholder="Please enter comments or remarks"
            disabled={disabled}
          />
        </Form.Item>
      </Form.Item>

      <Title level={4}>Functionality of CHUs</Title>
      <Form.Item
        label="Have you conducted CHU functionality assessment in the last 12 months?"
        required
      >
        <Form.Item name="conducted_assessment_last_12_months">
          <RadioGroup disabled={disabled}>
            <Radio value="yes">Yes, all CHUs assessed</Radio>
            <Radio value="partly">Partly, some CHUs assessed</Radio>
            <Radio value="no">No, no CHU assessed</Radio>
          </RadioGroup>
        </Form.Item>
      </Form.Item>

      <Form.Item label="Comment/Remarks" required>
        <Form.Item name="conducted_assessment_last_12_months_remarks">
          <TextArea
            rows={3}
            size="large"
            placeholder="Please enter comments or remarks for the assessment"
            disabled={disabled}
          />
        </Form.Item>
      </Form.Item>

      {allvalues["conducted_assessment_last_12_months"] !== "no" && (
        <>
          <Title level={5}>Based on the CHU functionality assessment report</Title>
          <Row gutter={[16, 16]}>
            <Col>
              <Form.Item label="Enter total No of assessed CHUs" required>
                <Form.Item name="total_chus_assessed">
                  <InputNumber
                    min={0}
                    style={{ width: "100%" }}
                    size="large"
                    placeholder="Enter No."
                    disabled={disabled}
                  />
                </Form.Item>
              </Form.Item>
            </Col>
            {/* Other input fields omitted for brevity */}
          </Row>
        </>
      )}

      {respondents?.length > 0 && (
        <>
         
          <Title level={4}>WorkPlan & Performance</Title>
<FormItem
  disabled={disabled}
  name='latest_chpolicies_disseminated'
  control={control}
  label="Have the following latest key CH policies and guidelines been disseminated? (Confirm with meeting minutes/reports)">
  <RadioGroup>
    <Radio value={'yes'}>Yes</Radio>
    <Radio value={'no'}>No</Radio>
  </RadioGroup>
</FormItem>
<FormItem
  disabled={disabled}
  name='comments_awp'
  control={control}
  label="Comment">
  <TextArea rows={3} size={'large'} placeholder='Please enter comments or remarks' />
</FormItem>

          {/* Additional respondent-related fields */}
        </>
      )}
    </Form>
  );
};

export default CHUFunctionality;
