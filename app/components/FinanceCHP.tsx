'use client';

import React from 'react';
import { Form, Card, Typography, Divider, Select, Input, Button } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';

const { Title } = Typography;

interface FinanceCHPProps {
  onNext: () => void;
  onPrevious: () => void;
}

const FinanceCHP = ({ onNext, onPrevious }: FinanceCHPProps) => {
  const { control } = useForm({
    defaultValues: {
      countyFunding: undefined,
      fundingComments: ''
    }
  });

  return (
    <div className="container mx-auto px-4">
      <Card className="mb-6">
        <Title level={3}>Finance</Title>
        <Divider />

        <Form layout="vertical">
          <FormItem
            required
            label="Does the county fund your activities? (eg dialogue days/action)"
            control={control}
            name="countyFunding"
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
            label="Comments"
            control={control}
            name="fundingComments"
          >
            <Input.TextArea rows={3} placeholder="Enter any comments about funding" />
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

export default FinanceCHP;
