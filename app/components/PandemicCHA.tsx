import React from 'react';
import { Form, Card, Typography, Select, InputNumber, Input, Button } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';

const { Title } = Typography;

const PandemicCHA = ({ onNext, onPrevious }) => {
  const { control, watch } = useForm({
    defaultValues: {
      hasCommunicationChannels: undefined,
      rcceTraining: undefined,
      trainedCount: undefined,
      pandemicComments: ''
    }
  });

  const rcceTrainingStatus = watch('rcceTraining');

  return (
    <div className="container mx-auto px-4">
      <Title level={2}>Pandemic Preparedness</Title>
      
      <Card className="mb-6">
        <Form layout="vertical">
          {/* Communication Channels */}
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

          {/* RCCE Training Status */}
          <FormItem
            required
            label="Have the CHPs been trained on RCCE (Risk Communication and Community Engagement (RCCE)?"
            control={control}
            name="rcceTraining"
            rules={{ required: 'This field is required' }}
          >
            <Select
              placeholder="Select an option"
              options={[
                { value: 'all', label: 'All trained' },
                { value: 'some', label: 'Some' },
                { value: 'none', label: 'None' }
              ]}
            />
          </FormItem>

          {/* Number of Trained CHPs - Conditional */}
          {(rcceTrainingStatus === 'all' || rcceTrainingStatus === 'some') && (
            <FormItem
              required
              label="How many CHPs have been trained on RCCE?"
              control={control}
              name="trainedCount"
              rules={{ 
                required: 'This field is required',
                min: { value: 1, message: 'Must be at least 1' },
                max: { value: 50, message: 'Must not exceed 50' }
              }}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder="Enter number of trained CHPs"
                min={1}
                max={50}
              />
            </FormItem>
          )}

          {/* Comments Section */}
          <FormItem
            label="Comments"
            control={control}
            name="pandemicComments"
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
              Review
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default PandemicCHA;
