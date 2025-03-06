'use client';

import React from 'react';
import { Form, Card, Typography, Divider, Select, Button } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';

const { Title } = Typography;

interface CHISMonitoringCHPProps {
  onNext: () => void;
  onPrevious: () => void;
}

const CHISMonitoringCHP = ({ onNext, onPrevious }: CHISMonitoringCHPProps) => {
  const { control } = useForm({
    defaultValues: {
      reviewMeetingFrequency: undefined
    }
  });

  return (
    <div className="container mx-auto px-4">
      <Card className="mb-6">
        <Title level={3}>CHIS Monitoring & Evaluation</Title>
        <Divider />

        <Form layout="vertical">
          <FormItem
            required
            label="How frequently do you have review meetings with your supervisor?"
            control={control}
            name="reviewMeetingFrequency"
            rules={{ required: 'This field is required' }}
          >
            <Select
              placeholder="Select frequency"
              options={[
                { value: 'monthly', label: 'Monthly' },
                { value: 'every3months', label: 'Every 3 months' },
                { value: 'every6months', label: 'Every 6 months' },
                { value: 'every12months', label: 'Every 12 months' },
                { value: 'never', label: 'Never' }
              ]}
            />
          </FormItem>

          <div className="flex justify-between mt-4">
            <Button onClick={onPrevious}>
              Previous
            </Button>
            <Button type="primary" onClick={onNext}>
              Next
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default CHISMonitoringCHP;
