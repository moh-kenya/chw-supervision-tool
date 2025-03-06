import React from 'react';
import { Form, Card, Typography, InputNumber, Input, Button } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';

const { Title } = Typography;

const ServiceDeliveryCHA = ({ onNext, onPrevious }) => {
  const { control } = useForm({
    defaultValues: {
      totalHouseholds: undefined,
      registeredHouseholds: undefined,
      householdsVisited: undefined,
      registrationProportion: undefined,
      visitedProportion: undefined,
      communityDialogues: undefined,
      householdsEnrolledSHA: undefined,
      serviceDeliveryComments: ''
    }
  });

  return (
    <div className="container mx-auto px-4">
      <Title level={2}>Service Delivery</Title>
      
      <Card className="mb-6">
        <Form layout="vertical">
          {/* Total Households */}
          <FormItem
            required
            label="Total Number of Households"
            control={control}
            name="totalHouseholds"
            rules={{ required: 'This field is required' }}
          >
            <InputNumber 
              style={{ width: '100%' }}
              placeholder="Enter total households"
            />
          </FormItem>

          {/* Registered Households */}
          <FormItem
            required
            label="Number of households registered in eCHIS"
            control={control}
            name="registeredHouseholds"
            rules={{ required: 'This field is required' }}
            extra="Pull from eCHIS"
          >
            <InputNumber 
              style={{ width: '100%' }}
              placeholder="Enter registered households"
            />
          </FormItem>

          {/* Households Visited */}
          <FormItem
            required
            label="Number of households visited last month"
            control={control}
            name="householdsVisited"
            rules={{ required: 'This field is required' }}
            extra="Pull from eCHIS"
          >
            <InputNumber 
              style={{ width: '100%' }}
              placeholder="Enter visited households"
            />
          </FormItem>

          {/* Registration Proportion */}
          <FormItem
            required
            label="Proportion of households registration"
            control={control}
            name="registrationProportion"
            rules={{ required: 'This field is required' }}
            extra="Number of households registered in eCHIS/Total Number of households*100%"
          >
            <InputNumber 
              style={{ width: '100%' }}
              placeholder="Enter registration proportion"
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
            />
          </FormItem>

          {/* Visited Proportion */}
          <FormItem
            required
            label="Proportion of households visited last month"
            control={control}
            name="visitedProportion"
            rules={{ required: 'This field is required' }}
            extra="Number of households visited last month/Total Number of Households*100%"
          >
            <InputNumber 
              style={{ width: '100%' }}
              placeholder="Enter visited proportion"
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
            />
          </FormItem>

          {/* Community Dialogues */}
          <FormItem
            required
            label="Number of community dialogues conducted in the last quarter"
            control={control}
            name="communityDialogues"
            rules={{ required: 'This field is required' }}
            extra="Pull from eCHIS"
          >
            <InputNumber 
              style={{ width: '100%' }}
              placeholder="Enter number of dialogues"
            />
          </FormItem>

          {/* SHA Enrolled Households */}
          <FormItem
            required
            label="Number of households enrolled on SHA?"
            control={control}
            name="householdsEnrolledSHA"
            rules={{ 
              required: 'This field is required',
              max: { value: 1000000, message: 'Value must not exceed 1,000,000' }
            }}
          >
            <InputNumber 
              style={{ width: '100%' }}
              placeholder="Enter enrolled households"
              max={1000000}
            />
          </FormItem>

          {/* Comments Section */}
          <FormItem
            label="Comments"
            control={control}
            name="serviceDeliveryComments"
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

export default ServiceDeliveryCHA;
