import React from 'react';
import { Form, Card, Typography, Divider, Select, InputNumber, Input, Button } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';

const { Title } = Typography;

const WorkforceCHA = ({ onNext, onPrevious }) => {
  const { control, watch } = useForm({
    defaultValues: {
      expectedCHPs: 10,
      hasExpectedCHPs: undefined,
      chpsCount: undefined,
      chpsBasicTraining: undefined,
      chpsTrainedCount: undefined,
      stipendFrequency: undefined,
      lastStipendPaid: undefined,
      stipendAmount: undefined,
      workforceComments: ''
    }
  });

  // Watch values for conditional rendering
  const hasExpectedCHPs = watch('hasExpectedCHPs');
  const chpsBasicTraining = watch('chpsBasicTraining');
  const stipendFrequency = watch('stipendFrequency');

  return (
    <div className="container mx-auto px-4">
      <Title level={2}>Workforce CHP Training</Title>
      
      <Card className="mb-6">
        <Form layout="vertical">
          {/* Expected Number Note */}
          <div className="mb-4 p-2 bg-gray-50">
            <p>Expected No of CHPs is 10</p>
          </div>

          {/* Question 1: Expected CHPs */}
          <FormItem
            required
            label="Do you have the expected number of CHPs in a CHU?"
            control={control}
            name="hasExpectedCHPs"
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

          {/* Question 2: Number of CHPs */}
          {hasExpectedCHPs === 'no' && (
            <FormItem
              required
              label="How many CHPs do you have?"
              control={control}
              name="chpsCount"
              rules={{ 
                required: 'This field is required',
                min: { value: 1, message: 'Must be between 1 and 50' },
                max: { value: 50, message: 'Must be between 1 and 50' }
              }}
            >
              <InputNumber 
                placeholder="Enter number of CHPs"
                style={{ width: '100%' }}
                min={1}
                max={50}
              />
            </FormItem>
          )}

          {/* Question 3: Basic Training */}
          <FormItem
            required
            label="Have all your CHPs received the training in the basic module training?"
            control={control}
            name="chpsBasicTraining"
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

          {/* Question 4: Number of CHPs Trained */}
          {chpsBasicTraining === 'no' && (
            <FormItem
              required
              label="Number of CHPs trained"
              control={control}
              name="chpsTrainedCount"
              rules={{ 
                required: 'This field is required',
                min: { value: 1, message: 'Must be between 1 and 50' },
                max: { value: 50, message: 'Must be between 1 and 50' }
              }}
            >
              <InputNumber 
                placeholder="Enter number of trained CHPs"
                style={{ width: '100%' }}
                min={1}
                max={50}
              />
            </FormItem>
          )}

          {/* Question 5: Stipend Frequency */}
          <FormItem
            required
            label="How often do the CHPs receive their stipend?"
            control={control}
            name="stipendFrequency"
            rules={{ required: 'This field is required' }}
          >
            <Select
              placeholder="Select frequency"
              options={[
                { value: 'monthly', label: 'Monthly' },
                { value: 'quarterly', label: 'Quarterly' },
                { value: 'biannually', label: 'Bi-annually' },
                { value: 'unscheduled', label: 'Unscheduled' },
                { value: 'yearly', label: 'Yearly' },
                { value: 'never', label: 'Never' }
              ]}
            />
          </FormItem>

          {/* Question 6: Last Stipend Payment - Show if NOT Never */}
          {stipendFrequency && stipendFrequency !== 'never' && (
            <FormItem
              required
              label="When were your CHPs last paid their stipend?"
              control={control}
              name="lastStipendPaid"
              rules={{ required: 'This field is required' }}
            >
              <Select
                placeholder="Select last payment period"
                options={[
                  { value: 'last_month', label: 'Last Month' },
                  { value: 'last_3_months', label: 'Last 3 months' },
                  { value: 'last_6_months', label: 'Last 6 months' },
                  { value: 'last_12_months', label: 'Last 12 months' },
                  { value: 'never', label: 'Never' }
                ]}
              />
            </FormItem>
          )}

          {/* Question 7: Stipend Amount */}
          {stipendFrequency && stipendFrequency !== 'never' && (
            <FormItem
              required
              label="Enter the amount received per month"
              control={control}
              name="stipendAmount"
              rules={{ 
                required: 'This field is required',
                min: { value: 0, message: 'Amount must be between 0 and 10000' },
                max: { value: 10000, message: 'Amount must be between 0 and 10000' }
              }}
            >
              <InputNumber
                placeholder="Enter amount"
                style={{ width: '100%' }}
                min={0}
                max={10000}
              />
            </FormItem>
          )}

          {/* Comments Section */}
          <FormItem
            label="Comments"
            control={control}
            name="workforceComments"
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

export default WorkforceCHA;
