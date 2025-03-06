'use client';

import React from 'react';
import { Form, Card, Typography, Divider, Select, InputNumber, Input, Button } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';

const { Title } = Typography;

interface ReferralCHPProps {
  onNext: () => void;
  onPrevious: () => void;
}

const ReferralCHP = ({ onNext, onPrevious }: ReferralCHPProps) => {
  const { control, watch } = useForm({
    defaultValues: {
      hasReferralTools: undefined,
      numWithTools: undefined,
      referralComments: ''
    }
  });

  const hasReferralTools = watch('hasReferralTools');

  return (
    <div className="container mx-auto px-4">
      <Card className="mb-6">
        <Title level={3}>Referral</Title>
        <Divider />

        <Form layout="vertical">
          <FormItem
            required
            label="Do you all (CHPs) have the referral tools (MOH 100)? (Verify with the CHP referral file)"
            control={control}
            name="hasReferralTools"
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

          {hasReferralTools === 'no' && (
            <FormItem
              required
              label="How many of you have the tools?"
              control={control}
              name="numWithTools"
              rules={{ 
                required: 'This field is required',
                min: { value: 1, message: 'Value must be between 1 and 50' },
                max: { value: 50, message: 'Value must be between 1 and 50' }
              }}
            >
              <InputNumber min={1} max={50} style={{ width: '100%' }} />
            </FormItem>
          )}

          <FormItem
            label="Comments"
            control={control}
            name="referralComments"
          >
            <Input.TextArea rows={3} placeholder="Enter any comments about referral tools" />
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

export default ReferralCHP;
