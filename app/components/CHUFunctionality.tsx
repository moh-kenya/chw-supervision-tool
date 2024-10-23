"use client"
import React from 'react';
import { Form, InputNumber, Checkbox, Card, Row, Col } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;

const CHUFunctionality = () => {
  return (
    <Form layout="vertical">
      <Title level={2}>Leadership & Governance</Title>
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
        <Col>
          <Card title="No of CHUs registered in MCHUL" style={{ width: 300, height: 200 }}>
            <p style={{ fontSize: '50px', textAlign: 'center', marginTop: -5 }}>45</p>
          </Card>
        </Col>
      </Row>

      <FormItem label="Comments/Remarks">
        <TextArea rows={4} />
      </FormItem>
      <FormItem label="Have you conducted CHU functionality assessment in the last 12 months? (Verify with reports/minutes)">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>
      <Title level={4}>Functionality of CHUs </Title>
      {/* Comment/Remarks */}
      <FormItem label="Comment/Remarks">
        <TextArea rows={3} />
      </FormItem>
      <Title level={5}> Based on the CHU functionality assessment report</Title>

      <Row gutter={[16, 16]}>
        <Col>
          <FormItem label="Enter total No of assessed CHUs">
            <InputNumber min={0} style={{ width: '100%' }} />
          </FormItem>
        </Col>
        <Col>
          <FormItem label="Enter No of fully-functional CHUs">
            <InputNumber min={0} style={{ width: '100%' }} />
          </FormItem>
        </Col>
        <Col>
          <FormItem label="Enter No of Semi-functional CHUs">
            <InputNumber min={0} style={{ width: '100%' }} />
          </FormItem>
        </Col>
        <Col>
          <FormItem label="Enter No of Non-functional CHUs">
            <InputNumber min={0} style={{ width: '100%' }} />
          </FormItem>
        </Col>
      </Row>

      {/* Comment */}
      <FormItem label="Comment">
        <TextArea rows={3} />
      </FormItem>
      <Title level={4}>Annual WorkPlan & Performance  </Title>
      {/* Annual WorkPlan & Performance */}
      <FormItem label="Are Community Health services integrated in the current county annual workplan? (Confirm with the AWP)">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>

      <FormItem label="Are Community Health services integrated in the current sub-county annual workplan? (Confirm with the AWP)">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>

      <FormItem label="Do you have a 5-year costed CHS implementation plan?">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>

      {/* Comments/Remarks */}
      <FormItem label="Comments/Remarks">
        <TextArea rows={3} />
      </FormItem>

      {/* Sensitization on Key CH Policies */}
      <FormItem label="Have you been sensitized on the latest key CH policies and guidelines (Confirm with meeting minutes/reports)">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>

      <FormItem label="Have you sensitized your CHAs on the latest key CH policies and guidelines (Confirm with meeting minutes/reports)">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>

      {/* Key Policies Dissemination */}
      <FormItem label="Have the following latest key CH policies and guidelines been disseminated? (Confirm with meeting minutes/reports)">
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormItem>

      {/* Comment */}
      <FormItem label="Comment">
        <TextArea rows={3} />
      </FormItem>
    </Form>
  );
};

export default CHUFunctionality;
