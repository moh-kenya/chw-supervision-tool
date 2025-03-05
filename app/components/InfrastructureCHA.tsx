import React from 'react';
import { Form, Card, Typography, Divider, Select, Input, Button } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';

const { Title } = Typography;

const InfrastructureCHA = ({ onNext, onPrevious }) => {
  const { control } = useForm({
    defaultValues: {
      hasCHUOffice: undefined,
      hasICTInfrastructure: undefined,
      hasChalkboard: undefined,
      hasUpdatedChalkboard: undefined,
      hasInventory: undefined,
      infrastructureComments: ''
    }
  });

  return (
    <div className="container mx-auto px-4">
      <Title level={2}>Infrastructure</Title>
      
      <Card className="mb-6">
        <Form layout="vertical">
          {/* Question 1: CHU Office */}
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

          {/* Question 2: ICT Infrastructure */}
          <FormItem
            required
            label="Do you have access to ICT infrastructure (Desktop/Laptop & Internet) (Both)"
            control={control}
            name="hasICTInfrastructure"
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

          {/* Question 3: Chalkboard */}
          <FormItem
            required
            label="Does your CHU have the current version of the chalkboard MoH 516 (Verify Revised 2019)"
            control={control}
            name="hasChalkboard"
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

          {/* Question 4: Chalkboard Data */}
          <FormItem
            required
            label="Is the chalkboard data upto date? (Verify)"
            control={control}
            name="hasUpdatedChalkboard"
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

          {/* Question 5: CHS Equipment Inventory */}
          <FormItem
            required
            label="Do you have an upto date inventory of CHS equipment eg CHP kits, Mobile phones etc? (Verify)"
            control={control}
            name="hasInventory"
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
            name="infrastructureComments"
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

export default InfrastructureCHA;
