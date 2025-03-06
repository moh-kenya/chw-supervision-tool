import React from 'react';
import { Form, Card, Typography, Divider, Select, Input, InputNumber, Button } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';

const { Title } = Typography;

const CommoditiesCHA = ({ onNext, onPrevious }) => {
  const { control, watch } = useForm({
    defaultValues: {
      allCHPsKitted: undefined,
      nonKittedCount: undefined,
      facilityReplenishment: undefined,
      digitalThermometer: undefined,
      bpMachine: undefined,
      muacTape: undefined,
      glucometer: undefined,
      orsZinc: undefined,
      albendazole: undefined,
      paracetamol: undefined,
      examinationGloves: undefined,
      condoms: undefined,
      malariaRDTs: undefined,
      masks: undefined,
      stockouts: undefined,
      commoditiesComments: ''
    }
  });

  const allCHPsKitted = watch('allCHPsKitted');

  return (
    <div className="container mx-auto px-4">
      <Title level={2}>Commodities</Title>
      
      <Card className="mb-6">
        <Form layout="vertical">
          {/* CHPs Kitting Status */}
          <FormItem
            required
            label="Are all your CHPs kitted?"
            control={control}
            name="allCHPsKitted"
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

          {/* Number of Non-kitted CHPs - Conditional */}
          {allCHPsKitted === 'no' && (
            <FormItem
              required
              label="How many are NOT kitted?"
              control={control}
              name="nonKittedCount"
              rules={{ 
                required: 'This field is required',
                min: { value: 1, message: 'Must be at least 1' }
              }}
            >
              <InputNumber
                placeholder="Enter number"
                style={{ width: '100%' }}
                min={1}
              />
            </FormItem>
          )}

          {/* Facility Replenishment */}
          <FormItem
            required
            label="Does your link health facility replenish your kits as needed?"
            control={control}
            name="facilityReplenishment"
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

          <Divider>Available Commodities</Divider>
          <div className="bg-gray-50 p-4 mb-4">
            <p>Sample with 3 CHPs by confirming if the items are available. Select yes if ALL the 3 CHPs have the commodities</p>
          </div>

          {/* Digital Thermometer */}
          <FormItem
            required
            label="Functional Digital thermometer"
            control={control}
            name="digitalThermometer"
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

          {/* BP Machine */}
          <FormItem
            required
            label="Functional BP Machine"
            control={control}
            name="bpMachine"
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

          {/* MUAC Tape */}
          <FormItem
            required
            label="MUAC Tape"
            control={control}
            name="muacTape"
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

          {/* Glucometer & Strips */}
          <FormItem
            required
            label="Glucometer & Glucometer strips"
            control={control}
            name="glucometer"
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

          {/* ORS-Zinc */}
          <FormItem
            required
            label="ORS-Zinc Co-Pack/ORS and Zinc"
            control={control}
            name="orsZinc"
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

          {/* Albendazole */}
          <FormItem
            required
            label="Albendazole tablets/Suspension"
            control={control}
            name="albendazole"
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

          {/* Paracetamol */}
          <FormItem
            required
            label="Paracetamol tablets/Suspension"
            control={control}
            name="paracetamol"
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

          {/* Examination Gloves */}
          <FormItem
            required
            label="Examination gloves"
            control={control}
            name="examinationGloves"
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

          {/* Condoms */}
          <FormItem
            required
            label="Condoms (Male/Female)"
            control={control}
            name="condoms"
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

          {/* Malaria RDTs */}
          <FormItem
            required
            label="Malaria RDTs/Artemether/Lumefantrine (Malaria Zone)"
            control={control}
            name="malariaRDTs"
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

          {/* Masks */}
          <FormItem
            required
            label="Masks"
            control={control}
            name="masks"
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

          {/* Stockouts Experience */}
          <FormItem
            required
            label="Have you experienced stockouts of the CHP Tracer Commodities in the last 3 months?"
            control={control}
            name="stockouts"
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

          {/* Single Comments Section at the End */}
          <FormItem
            label="Comments"
            control={control}
            name="commoditiesComments"
          >
            <Input.TextArea 
              placeholder="Enter any additional comments about commodities"
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

export default CommoditiesCHA;
