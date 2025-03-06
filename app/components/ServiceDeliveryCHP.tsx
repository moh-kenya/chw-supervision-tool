'use client';

import React from 'react';
import { Form, Card, Typography, Divider, Input, Button, InputNumber, Tooltip } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';

const { Title } = Typography;

interface ServiceDeliveryCHPProps {
  onNext: () => void;
  onPrevious: () => void;
}

const ServiceDeliveryCHP: React.FC<ServiceDeliveryCHPProps> = ({ onNext, onPrevious }) => {
  const { control } = useForm({
    defaultValues: {
      totalHouseholds: undefined,
      registeredHouseholds: undefined,
      visitedHouseholds: undefined,
      registrationProportion: undefined,
      visitedProportion: undefined,
      comments: '',
      numDialogues: undefined,
      dialogueComments: '',
      numEnrolledSHA: undefined
    }
  });

  return (
    <div className="container mx-auto px-4">
      <Card className="mb-6">
        <Title level={3}>Service Delivery</Title>
        <Divider />

        <Form layout="vertical">
          <FormItem
            required
            label="Total Number of Households"
            control={control}
            name="totalHouseholds"
            rules={{ required: 'This field is required' }}
          >
            <InputNumber style={{ width: '100%' }} />
          </FormItem>

          <Tooltip title="Pull from eCHIS">
            <FormItem
              required
              label="Number of households registered in eCHIS"
              control={control}
              name="registeredHouseholds"
              rules={{ required: 'This field is required' }}
            >
              <InputNumber style={{ width: '100%' }} />
            </FormItem>
          </Tooltip>

          <Tooltip title="Pull from eCHIS">
            <FormItem
              required
              label="Number of households visited last month"
              control={control}
              name="visitedHouseholds"
              rules={{ required: 'This field is required' }}
            >
              <InputNumber style={{ width: '100%' }} />
            </FormItem>
          </Tooltip>

          <Tooltip title="Number of households registered in eCHIS/Total Number of Households*100%">
            <FormItem
              required
              label="Proportion of households registration"
              control={control}
              name="registrationProportion"
              rules={{ required: 'This field is required' }}
            >
              <InputNumber
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value) => value?.replace('%', '')}
                style={{ width: '100%' }}
              />
            </FormItem>
          </Tooltip>

          <Tooltip title="Number of households visited last month/Total Number of Households*100%">
            <FormItem
              required
              label="Proportion of households visited last month"
              control={control}
              name="visitedProportion"
              rules={{ required: 'This field is required' }}
            >
              <InputNumber
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value) => value?.replace('%', '')}
                style={{ width: '100%' }}
              />
            </FormItem>
          </Tooltip>

          <FormItem
            label="Comments/Remarks"
            control={control}
            name="comments"
          >
            <Input.TextArea rows={3} />
          </FormItem>

          <Tooltip title="Pull from eCHIS">
            <FormItem
              required
              label="Number of community dialogues conducted in the last quarter"
              control={control}
              name="numDialogues"
              rules={{ required: 'This field is required' }}
            >
              <InputNumber style={{ width: '100%' }} />
            </FormItem>
          </Tooltip>

          <FormItem
            label="Comments/Remarks"
            control={control}
            name="dialogueComments"
          >
            <Input.TextArea rows={3} />
          </FormItem>

          <FormItem
            required
            label="Number of households enrolled on SHA2"
            control={control}
            name="numEnrolledSHA"
            rules={{ 
              required: 'This field is required',
              max: { value: 1000000, message: 'Value must not exceed 1,000,000' }
            }}
          >
            <InputNumber max={1000000} style={{ width: '100%' }} />
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

export default ServiceDeliveryCHP;
