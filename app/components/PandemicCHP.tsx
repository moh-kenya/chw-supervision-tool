'use client';

import React from 'react';
import { Form, Card, Typography, Divider, Select, InputNumber, Input, Button } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';

const { Title } = Typography;

interface PandemicCHPProps {
  onNext: () => void;
  onPrevious: () => void;
}

const PandemicCHP = ({ onNext, onPrevious }: PandemicCHPProps) => {
  const { control, watch } = useForm({
    defaultValues: {
      hasCommunicationChannels: undefined,
      channelComments: '',
      rcceTrainingStatus: undefined,
      numTrainedRCCE: undefined,
      rcceComments: ''
    }
  });

  const rcceTrainingStatus = watch('rcceTrainingStatus');

  return (
    <div className="container mx-auto px-4">
      <Card className="mb-6">
        <Title level={3}>Pandemic Preparedness</Title>
        <Divider />

        <Form layout="vertical">
          <FormItem
            required
            label="Presence of community communication channels for reporting pandemics eg toll free lines"
            control={control}
            name="hasCommunicationChannels"
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
            label="Comments/Remarks"
            control={control}
            name="channelComments"
          >
            <Input.TextArea rows={3} />
          </FormItem>

          <FormItem
            required
            label="Have you (CHPs) been trained on RCCE (Risk Communication and Community Engagement (RCCE)?"
            control={control}
            name="rcceTrainingStatus"
            rules={{ required: 'This field is required' }}
          >
            <Select
              placeholder="Select status"
              options={[
                { value: 'allTrained', label: 'All trained' },
                { value: 'some', label: 'Some' },
                { value: 'none', label: 'None' }
              ]}
            />
          </FormItem>

          {rcceTrainingStatus === 'some' && (
            <FormItem
              required
              label="How many of you (CHPs) have been trained on RCCE?"
              control={control}
              name="numTrainedRCCE"
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
            label="Comments/Remarks"
            control={control}
            name="rcceComments"
          >
            <Input.TextArea rows={3} />
          </FormItem>

          <div className="flex justify-between mt-4">
            <Button onClick={onPrevious}>
              Previous
            </Button>
            <Button type="primary" onClick={onNext}>
              Finish Assessment
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default PandemicCHP;
