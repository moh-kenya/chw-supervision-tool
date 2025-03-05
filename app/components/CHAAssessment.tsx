'use client';

import React, { useState } from 'react';
import { Form, Card, Typography, Divider, Select, InputNumber, Input, Button, Descriptions } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';
import WorkforceCHA from './WorkforceCHA';
import InfrastructureCHA from './InfrastructureCHA';
import FinanceCHA from './FinanceCHA';
import TransportCHA from './TransportCHA';
import CommoditiesCHA from './CommoditiesCHA';
import ReferralCHA from './ReferralCHA';
import ServiceDeliveryCHA from './ServiceDeliveryCHA';
import PandemicCHA from './PandemicCHA';
import ReviewCHA from './ReviewCHA';

const { Title } = Typography;

interface CHAAssessmentProps {
  initialData: {
    timeInPosition: string;
    county: string;
    subCounty: string;
    ward: string;
    chu: string;
  };
  onBack: () => void;
}

const CHAAssessment = ({ initialData, onBack }: CHAAssessmentProps) => {
  const [currentSection, setCurrentSection] = useState('leadership');
  const [formData, setFormData] = useState({});
  const { control, watch } = useForm({
    defaultValues: {
      functionalityDone: undefined,
      functionalityLast12Months: undefined,
      functionalityStatus: undefined
    }
  });

  // Watch the 12 months question to conditionally show status
  const functionalityLast12Months = watch('functionalityLast12Months');

  const handleNext = () => {
    switch(currentSection) {
      case 'leadership':
        setCurrentSection('workforce');
        break;
      case 'workforce':
        setCurrentSection('infrastructure');
        break;
      case 'infrastructure':
        setCurrentSection('finance');
        break;
      case 'finance':
        setCurrentSection('transport');
        break;
      case 'transport':
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
        setCurrentSection('review');
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
      case 'finance':
        setCurrentSection('infrastructure');
        break;
      case 'transport':
        setCurrentSection('finance');
        break;
      case 'commodities':
        setCurrentSection('transport');
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
      case 'review':
        setCurrentSection('pandemic');
        break;
    }
  };

  if (currentSection === 'workforce') {
    return <WorkforceCHA onNext={handleNext} onPrevious={handlePrevious} />;
  }

  if (currentSection === 'infrastructure') {
    return <InfrastructureCHA onNext={handleNext} onPrevious={handlePrevious} />;
  }

  if (currentSection === 'finance') {
    return <FinanceCHA onNext={handleNext} onPrevious={handlePrevious} />;
  }

  if (currentSection === 'transport') {
    return <TransportCHA onNext={handleNext} onPrevious={handlePrevious} />;
  }

  if (currentSection === 'commodities') {
    return <CommoditiesCHA onNext={handleNext} onPrevious={handlePrevious} />;
  }

  if (currentSection === 'referral') {
    return <ReferralCHA onNext={handleNext} onPrevious={handlePrevious} />;
  }

  if (currentSection === 'serviceDelivery') {
    return <ServiceDeliveryCHA onNext={handleNext} onPrevious={handlePrevious} />;
  }

  if (currentSection === 'pandemic') {
    return <PandemicCHA onNext={handleNext} onPrevious={handlePrevious} />;
  }

  if (currentSection === 'review') {
    return <ReviewCHA 
      formData={formData}
      onPrevious={handlePrevious}
      onSubmit={() => {
        // Handle form submission here
        console.log('Submitting form data:', formData);
      }}
    />;
  }

  return (
    <div className="container mx-auto px-4">
      {/* Location Information */}
      <Card className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <Title level={3}>CHA Assessment</Title>
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
      <Title level={2}>CHA Assessment</Title>
      
      {/* Leadership & Governance Section */}
      <Card className="mb-6">
        <Title level={3}>Leadership & Governance</Title>
        <Divider />

        {/* 1. Functionality of CHUs */}
        <div className="mb-8">
          <Title level={4}>Functionality of the CHU's</Title>
          <Form layout="vertical">
            {/* Question 1: Functionality Done */}
            <FormItem
              required
              label="Functionality of this CHU done?"
              control={control}
              name="functionalityDone"
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

            {/* Question 2: Last 12 Months Assessment */}
            <FormItem
              required
              label="Was functionality assessment of this CHU conducted in the last 12 months?"
              control={control}
              name="functionalityLast12Months"
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

            {/* Question 3: Functionality Status - Conditional */}
            {functionalityLast12Months === 'yes' && (
              <FormItem
                required
                label="Based on the CHU functionality assessment report, select its functionality assessment status"
                control={control}
                name="functionalityStatus"
                rules={{ required: 'This field is required' }}
              >
                <Select
                  placeholder="Select status"
                  options={[
                    { value: 'full_functional', label: 'Full Functional' },
                    { value: 'semi_functional', label: 'Semi Functional' },
                    { value: 'non_functional', label: 'Non Functional' }
                  ]}
                />
              </FormItem>
            )}
          </Form>
        </div>

        {/* 2. Community Health Centers */}
        <div className="mb-8">
          <Title level={4}>Community Health Centres in place</Title>
          <Form layout="vertical">
            {/* Question 1: Functional CHC */}
            <FormItem
              required
              label="Do you have a functional CHC in place?"
              control={control}
              name="hasFunctionalCHC"
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

            {/* Questions 2 & 3: Only show if CHC exists */}
            {watch('hasFunctionalCHC') === 'yes' && (
              <>
                {/* Question 2: CHC Members Training */}
                <FormItem
                  required
                  label="Are all the CHC members trained?"
                  control={control}
                  name="chcMembersTraining"
                  rules={{ required: 'This field is required' }}
                >
                  <Select
                    placeholder="Select training status"
                    options={[
                      { value: 'all', label: 'All are trained' },
                      { value: 'some', label: 'Some are trained' },
                      { value: 'none', label: 'None is trained' }
                    ]}
                  />
                </FormItem>

                {/* Conditional Question: Number of trained members */}
                {watch('chcMembersTraining') === 'some' && (
                  <FormItem
                    required
                    label="How many members are trained?"
                    control={control}
                    name="trainedMembersCount"
                    rules={{ 
                      required: 'Please enter the number of trained members',
                      min: {
                        value: 1,
                        message: 'Number must be at least 1'
                      }
                    }}
                  >
                    <InputNumber
                      placeholder="Enter number of trained members"
                      style={{ width: '100%' }}
                      min={1}
                    />
                  </FormItem>
                )}

                {/* Question 3: CHC Meeting */}
                <FormItem
                  required
                  label="Did you have a CHC meeting in the last quarter? (Confirm with the minutes)"
                  control={control}
                  name="hadQuarterlyMeeting"
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
              </>
            )}
          </Form>
        </div>

        {/* 3. Health Services Policies */}
        <div className="mb-8">
          <Title level={4}>Community Health Services Policies</Title>
          <Form layout="vertical">
            {/* Question 1: Work Plan Development */}
            <FormItem
              required
              label="Are you involved in the annual work plan development process?"
              control={control}
              name="involvedInWorkPlan"
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

            {/* Question 2: CH Policies Sensitization */}
            <FormItem
              required
              label="Have you been sensitized on the latest key CH policies and guidelines (Confirm with meeting minutes/reports)"
              control={control}
              name="sensitizedOnPolicies"
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

            {/* Question 3: Community Health Policy */}
            <FormItem
              required
              label="Community Health Policy (2020-2030)"
              control={control}
              name="healthPolicy2030"
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

            {/* Question 4: Community Health Strategy */}
            <FormItem
              required
              label="Community Health Strategy (2020-2025)"
              control={control}
              name="healthStrategy2025"
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

            {/* Question 5: Primary Health Care Act */}
            <FormItem
              required
              label="Primary Health Care Act 2023"
              control={control}
              name="healthCareAct2023"
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

            {/* Question 6: KMOCH Standards */}
            <FormItem
              required
              label="KMOCH Standards for Level 1"
              control={control}
              name="kmochStandards"
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

            {/* Final Comments Section */}
            <FormItem
              label="Comments/Remarks"
              control={control}
              name="policyComments"
            >
              <Input.TextArea 
                placeholder="Enter any additional comments"
                rows={4}
              />
            </FormItem>
          </Form>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end mt-6">
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CHAAssessment;
