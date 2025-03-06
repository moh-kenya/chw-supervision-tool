'use client';

import React from 'react';
import { Form, Card, Typography, Divider, Select, Input, Button } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';

const { Title } = Typography;

interface InfrastructureCHPProps {
  onNext: () => void;
  onPrevious: () => void;
}

const InfrastructureCHP = ({ onNext, onPrevious }: InfrastructureCHPProps) => {
  const { control, watch } = useForm({
    defaultValues: {
      hasCHUOffice: undefined,
      officeComment: '',
      hasSmartphone: undefined,
      smartphoneComment: '',
      hasRepairMechanism: undefined,
      hasReplacementMechanism: undefined,
      canSyncECHIS: undefined,
      hasECHISChallenges: undefined,
      echisChallenges: '',
      echisComment: ''
    }
  });

  const hasECHISChallenges = watch('hasECHISChallenges');

  return (
    <div className="container mx-auto px-4">
      <Card className="mb-6">
        <Title level={3}>Infrastructure</Title>
        <Divider />

        <Form layout="vertical">
          <FormItem
            required
            label="Do you have a CHU designated office? (Verify)"
            control={control}
            name="hasCHUOffice"
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
            label="Comment"
            control={control}
            name="officeComment"
          >
            <Input.TextArea rows={2} placeholder="Enter any comments" />
          </FormItem>

          <FormItem
            required
            label="Do you have a functional smartphone?"
            control={control}
            name="hasSmartphone"
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
            label="Comment"
            control={control}
            name="smartphoneComment"
          >
            <Input.TextArea rows={2} placeholder="Enter any comments" />
          </FormItem>

          <FormItem
            required
            label="Does your CU have a mechanism for repairing damaged phones?"
            control={control}
            name="hasRepairMechanism"
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
            required
            label="Does your CU have a mechanism for replacing lost phones?"
            control={control}
            name="hasReplacementMechanism"
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
            required
            label="Can you synchronize data to eCHIS without using your personal data bundles?"
            control={control}
            name="canSyncECHIS"
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
            required
            label="Have you experienced any challenges with eCHIS?"
            control={control}
            name="hasECHISChallenges"
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

          {hasECHISChallenges === 'yes' && (
            <FormItem
              required
              label="What challenges have you faced?"
              control={control}
              name="echisChallenges"
              rules={{ required: 'Please describe the challenges faced' }}
            >
              <Input.TextArea rows={4} placeholder="Describe the challenges you have faced with eCHIS" />
            </FormItem>
          )}

          <FormItem
            label="Comment"
            control={control}
            name="echisComment"
          >
            <Input.TextArea rows={2} placeholder="Enter any additional comments" />
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

export default InfrastructureCHP;
