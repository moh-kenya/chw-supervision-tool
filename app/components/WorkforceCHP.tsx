'use client';

import React from 'react';
import { Form, Card, Typography, Divider, Select, InputNumber, Button } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';

const { Title } = Typography;

interface WorkforceCHPProps {
  onNext: () => void;
  onPrevious: () => void;
}

const WorkforceCHP = ({ onNext, onPrevious }: WorkforceCHPProps) => {
  const { control, watch } = useForm({
    defaultValues: {
      basicTraining: undefined,
      numCHPsTrained: undefined,
      stipendFrequency: undefined,
      lastStipendTime: undefined
    }
  });

  const basicTraining = watch('basicTraining');
  const stipendFrequency = watch('stipendFrequency');

  return (
    <div className="container mx-auto px-4">
      <Card className="mb-6">
        <Title level={3}>Workforce</Title>
        <Divider />

        <div className="mb-8">
          <Title level={4}>CHP Training</Title>
          <Form layout="vertical">
            <FormItem
              required
              label="Have you all (CHPs) received the basic module training?"
              control={control}
              name="basicTraining"
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

            {basicTraining === 'no' && (
              <FormItem
                required
                label="Number of CHPs trained"
                control={control}
                name="numCHPsTrained"
                rules={{ required: 'This field is required' }}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </FormItem>
            )}

            <Title level={4} className="mt-8">CHPs Stipend (CHU)</Title>
            
            <FormItem
              required
              label="How often do you all receive the stipend?"
              control={control}
              name="stipendFrequency"
              rules={{ required: 'This field is required' }}
            >
              <Select
                placeholder="Select frequency"
                options={[
                  { value: 'monthly', label: 'Monthly' },
                  { value: 'quarterly', label: 'Quarterly' },
                  { value: 'biannually', label: 'Bi-annually' },
                  { value: 'unscheduled', label: 'Unscheduled' },
                  { value: 'yearly', label: 'Yearly' },
                  { value: 'never', label: 'Never' }
                ]}
              />
            </FormItem>

            {stipendFrequency !== 'never' && (
              <FormItem
                required
                label="When was the last time paid the stipend?"
                control={control}
                name="lastStipendTime"
                rules={{ required: 'This field is required' }}
              >
                <Select
                  placeholder="Select time period"
                  options={[
                    { value: 'lastMonth', label: 'Last Month' },
                    { value: 'last3months', label: 'Last 3 months' },
                    { value: 'last6months', label: 'Last 6 months' },
                    { value: 'last12months', label: 'Last 12 months' },
                    { value: 'never', label: 'Never' }
                  ]}
                />
              </FormItem>
            )}

            <div className="flex justify-between mt-4">
              <Button onClick={onPrevious}>
                Previous
              </Button>
              <Button type="primary" onClick={onNext}>
                Next
              </Button>
            </div>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default WorkforceCHP;
