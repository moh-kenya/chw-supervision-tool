'use client';

import React, { useState } from 'react';
import { Form, Card, Typography, Divider, Select, InputNumber, Input, Button, Descriptions } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';
import WorkforceCHP from './WorkforceCHP';
import InfrastructureCHP from './InfrastructureCHP';
import CHISMonitoringCHP from './CHISMonitoringCHP';
import SupervisionCHP from './SupervisionCHP';
import FinanceCHP from './FinanceCHP';
import CommoditiesCHP from './CommoditiesCHP';
import ReferralCHP from './ReferralCHP';
import ServiceDeliveryCHP from './ServiceDeliveryCHP';
import PandemicCHP from './PandemicCHP';

const { Title } = Typography;

interface CHPAssessmentProps {
  initialData: {
    timeInPosition: string;
    county: string;
    subCounty: string;
    ward: string;
    chu: string;
  };
  onBack: () => void;
}

const CHPAssessment = ({ initialData, onBack }: CHPAssessmentProps) => {
  const [currentSection, setCurrentSection] = useState('leadership');
  const [formData, setFormData] = useState({});
  const { control, watch } = useForm({
    defaultValues: {
      workplanInvolvement: undefined,
      workplanComments: '',
      basicTraining: undefined,
      numCHPsTrained: undefined,
      stipendFrequency: undefined,
      lastStipendTime: undefined
    }
  });

  // Watch for conditional fields
  const basicTraining = watch('basicTraining');
  const stipendFrequency = watch('stipendFrequency');

  const handleNext = () => {
    switch(currentSection) {
      case 'leadership':
        setCurrentSection('workforce');
        break;
      case 'workforce':
        setCurrentSection('infrastructure');
        break;
      case 'infrastructure':
        setCurrentSection('chisMonitoring');
        break;
      case 'chisMonitoring':
        setCurrentSection('supervision');
        break;
      case 'supervision':
        setCurrentSection('finance');
        break;
      case 'finance':
        setCurrentSection('commodities');
        break;
      case 'commodities':
        setCurrentSection('referral');
        break;
      case 'referral':
        setCurrentSection('serviceDelivery');
        break;
      case 'serviceDelivery':
        setCurrentSection('pandemic');
        break;
      case 'pandemic':
        onBack(); // Return to supervision form
        break;
    }
  };

  const handlePrevious = () => {
    switch(currentSection) {
      case 'workforce':
        setCurrentSection('leadership');
        break;
      case 'infrastructure':
        setCurrentSection('workforce');
        break;
      case 'chisMonitoring':
        setCurrentSection('infrastructure');
        break;
      case 'supervision':
        setCurrentSection('chisMonitoring');
        break;
      case 'finance':
        setCurrentSection('supervision');
        break;
      case 'commodities':
        setCurrentSection('finance');
        break;
      case 'referral':
        setCurrentSection('commodities');
        break;
      case 'serviceDelivery':
        setCurrentSection('referral');
        break;
      case 'pandemic':
        setCurrentSection('serviceDelivery');
        break;
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* Location Information */}
      <Card className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <Title level={3}>CHP Assessment</Title>
          <Button type="default" onClick={onBack}>
            Back to Supervision Form
          </Button>
        </div>
        
        <Descriptions bordered column={2}>
          <Descriptions.Item label="County">{initialData.county}</Descriptions.Item>
          <Descriptions.Item label="Sub-County">{initialData.subCounty}</Descriptions.Item>
          <Descriptions.Item label="Ward">{initialData.ward}</Descriptions.Item>
          <Descriptions.Item label="CHU">{initialData.chu}</Descriptions.Item>
          <Descriptions.Item label="Time in Position">{initialData.timeInPosition}</Descriptions.Item>
        </Descriptions>
      </Card>

      {currentSection === 'leadership' && (
        <Card className="mb-6">
          <Title level={3}>Leadership & Governance</Title>
          <Divider />
          
          <div className="mb-8">
            <Title level={4}>Community Health Services Policies</Title>
            <Form layout="vertical">
              <FormItem
                required
                label="Are you involved in the annual work plan development process?"
                control={control}
                name="workplanInvolvement"
                rules={{ required: 'This field is required' }}
              >
                <Select
                  placeholder="Select an option"
                  options={[
                    { value: 'yes', label: 'Yes' },
                    { value: 'no', label: 'No' }
                  ]}
                />
              </FormItem>

              <FormItem
                label="Comment/Remarks"
                control={control}
                name="workplanComments"
              >
                <Input.TextArea rows={4} placeholder="Enter any comments or remarks" />
              </FormItem>

              <div className="flex justify-end mt-4">
                <Button type="primary" onClick={handleNext}>
                  Next
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      )}

      {currentSection === 'workforce' && (
        <WorkforceCHP onNext={handleNext} onPrevious={handlePrevious} />
      )}

      {currentSection === 'infrastructure' && (
        <InfrastructureCHP onNext={handleNext} onPrevious={handlePrevious} />
      )}

      {currentSection === 'chisMonitoring' && (
        <CHISMonitoringCHP onNext={handleNext} onPrevious={handlePrevious} />
      )}

      {currentSection === 'supervision' && (
        <SupervisionCHP onNext={handleNext} onPrevious={handlePrevious} />
      )}

      {currentSection === 'finance' && (
        <FinanceCHP onNext={handleNext} onPrevious={handlePrevious} />
      )}

      {currentSection === 'commodities' && (
        <CommoditiesCHP onNext={handleNext} onPrevious={handlePrevious} />
      )}

      {currentSection === 'referral' && (
        <ReferralCHP onNext={handleNext} onPrevious={handlePrevious} />
      )}

      {currentSection === 'serviceDelivery' && (
        <ServiceDeliveryCHP onNext={handleNext} onPrevious={handlePrevious} />
      )}

      {currentSection === 'pandemic' && (
        <PandemicCHP onNext={handleNext} onPrevious={handlePrevious} />
      )}
    </div>
  );
};

export default CHPAssessment;

