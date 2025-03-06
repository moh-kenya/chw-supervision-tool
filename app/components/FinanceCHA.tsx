import React from 'react';
import { Form, Card, Typography, Divider, Select, Input, Button } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';

const { Title } = Typography;

const FinanceCHA = ({ onNext, onPrevious }) => {
  const { control } = useForm({
    defaultValues: {
      countyFunding: undefined,
      financeComments: ''
    }
  });

  return (
    <div className="container mx-auto px-4">
      <Title level={2}>Finance</Title>
      
      <Card className="mb-6">
        <Form layout="vertical">
          {/* County Funding Question */}
          <FormItem
            required
            label="Are the CHU operations funded by the county? (eg dialogue days/action)"
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

          {/* Comments Section */}
          <FormItem
            label="Comments"
            control={control}
            name="financeComments"
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

export default FinanceCHA;
