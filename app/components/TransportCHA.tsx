import React from 'react';
import { Form, Card, Typography, Divider, Select, Input, Button } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';

const { Title } = Typography;

const TransportCHA = ({ onNext, onPrevious }) => {
  const { control, watch } = useForm({
    defaultValues: {
      hasTransport: undefined,
      transportMaintained: undefined,
      transportComments: ''
    }
  });

  const hasTransport = watch('hasTransport');

  return (
    <div className="container mx-auto px-4">
      <Title level={2}>Transport</Title>
      
      <Card className="mb-6">
        <Form layout="vertical">
          {/* Transport Facilitation Question */}
          <FormItem
            required
            label="Have you been facilitated with a means of transport? (Motorbike/Bicycle-Target is CHA/CHO)"
            control={control}
            name="hasTransport"
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

          {/* Transport Maintenance Question - Conditional */}
          {hasTransport === 'yes' && (
            <FormItem
              required
              label="Is the provided means of transport maintained (Servicing & fueling) as needed?"
              control={control}
              name="transportMaintained"
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
          )}

          {/* Comments Section */}
          <FormItem
            label="Comments"
            control={control}
            name="transportComments"
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

export default TransportCHA;
