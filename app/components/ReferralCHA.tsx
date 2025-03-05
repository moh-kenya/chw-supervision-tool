import React from 'react';
import { Form, Card, Typography, Select, Input, Button } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';

const { Title } = Typography;

const ReferralCHA = ({ onNext, onPrevious }) => {
  const { control } = useForm({
    defaultValues: {
      hasReferralTools: undefined,
      hasTriageDesk: undefined,
      referralComments: ''
    }
  });

  return (
    <div className="container mx-auto px-4">
      <Title level={2}>Referral</Title>
      
      <Card className="mb-6">
        <Form layout="vertical">
          {/* Referral Tools */}
          <FormItem
            required
            label="Do you have referral tools (MoH 100)? (Verify with the CHA/referral file)"
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

          {/* Triage Desk */}
          <FormItem
            required
            label="Do you have a triage desk at the link facility manned by the CHPs? (Verify)"
            control={control}
            name="hasTriageDesk"
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

          {/* Comments Section */}
          <FormItem
            label="Comments"
            control={control}
            name="referralComments"
          >
            <Input.TextArea 
              placeholder="Enter any additional comments"
              rows={4}
            />
          </FormItem>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <Button type="default" onClick={onPrevious}>
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

export default ReferralCHA;
