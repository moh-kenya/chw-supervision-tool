'use client';

import React from 'react';
import { Form, Card, Typography, Divider, Select, InputNumber, Input, Button } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';

const { Title } = Typography;

interface SupervisionCHPProps {
  onNext: () => void;
  onPrevious: () => void;
}

const SupervisionCHP = ({ onNext, onPrevious }: SupervisionCHPProps) => {
  const { control, watch } = useForm({
    defaultValues: {
      supervisedLastQuarter: undefined,
      numSupervised: undefined,
      supervisionFrequency: undefined,
      supervisionComments: ''
    }
  });

  const supervisedLastQuarter = watch('supervisedLastQuarter');

  return (
    <div className="container mx-auto px-4">
      <Card className="mb-6">
        <Title level={3}>Supervision</Title>
        <Divider />

        <Form layout="vertical">
          <FormItem
            required
            label="Have you all been supervised in the last quarter?"
            control={control}
            name="supervisedLastQuarter"
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

          {supervisedLastQuarter === 'yes' && (
            <>
              <FormItem
                required
                label="How many were supervised"
                control={control}
                name="numSupervised"
                rules={{ required: 'This field is required' }}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </FormItem>

              <FormItem
                required
                label="How frequently were you supervised?"
                control={control}
                name="supervisionFrequency"
                rules={{ required: 'This field is required' }}
              >
                <Select
                  placeholder="Select frequency"
                  options={[
                    { value: 'onceQuarter', label: 'Once a quarter' },
                    { value: 'twiceQuarter', label: 'Twice in the quarter' },
                    { value: 'onceMonth', label: 'At least once a month' }
                  ]}
                />
              </FormItem>
            </>
          )}

          <FormItem
            label="Comments"
            control={control}
            name="supervisionComments"
          >
            <Input.TextArea rows={3} placeholder="Enter any comments about supervision" />
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

export default SupervisionCHP;
