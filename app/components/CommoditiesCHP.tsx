'use client';

import React from 'react';
import { Form, Card, Typography, Divider, Select, InputNumber, Input, Button } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { useForm } from 'react-hook-form';

const { Title } = Typography;

interface CommoditiesCHPProps {
  onNext: () => void;
  onPrevious: () => void;
}

const CommoditiesCHP = ({ onNext, onPrevious }: CommoditiesCHPProps) => {
  const { control, watch } = useForm({
    defaultValues: {
      hasKits: undefined,
      numKits: undefined,
      kitComments: '',
      facilityRecordsKits: undefined,
      facilityRecordsComments: '',
      hasStockouts: undefined,
      stockoutComments: '',
      // Community owned commodities
      hasDigitalThermometer: undefined,
      thermometerComments: '',
      hasBPMachine: undefined,
      bpMachineComments: '',
      hasMUACTape: undefined,
      muacTapeComments: '',
      hasGlucometerStrips: undefined,
      glucometerComments: '',
      hasORS: undefined,
      orsComments: '',
      hasAmoxicillin: undefined,
      amoxicillinComments: '',
      hasParacetamol: undefined,
      paracetamolComments: '',
      hasGloves: undefined,
      glovesComments: '',
      hasCondoms: undefined,
      condomsComments: '',
      hasRDTs: undefined,
      rdtsComments: '',
      hasMasks: undefined,
      masksComments: ''
    }
  });

  const hasKits = watch('hasKits');

  return (
    <div className="container mx-auto px-4">
      <Card className="mb-6">
        <Title level={3}>Commodities</Title>
        <Divider />

        <Form layout="vertical">
          <FormItem
            required
            label="Do you all (CHPs) have kits?"
            control={control}
            name="hasKits"
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

          {hasKits === 'no' && (
            <FormItem
              required
              label="How many of you are NOT kitted?"
              control={control}
              name="numKits"
              rules={{ required: 'This field is required' }}
            >
              <InputNumber min={1} max={50} style={{ width: '100%' }} />
            </FormItem>
          )}

          <FormItem
            label="Comments"
            control={control}
            name="kitComments"
          >
            <Input.TextArea rows={2} placeholder="Enter any comments about kits" />
          </FormItem>

          <FormItem
            required
            label="Does your link health facility replenish your kits as recorded?"
            control={control}
            name="facilityRecordsKits"
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
            label="Comment/Remarks"
            control={control}
            name="facilityRecordsComments"
          >
            <Input.TextArea rows={2} placeholder="Enter any comments about facility records" />
          </FormItem>

          <Title level={4} className="mt-6">Are the following items community owned/available under your custody? Confirm if the following commodities are available:</Title>

          {/* Digital Thermometer */}
          <FormItem
            required
            label="Functional Digital thermometer"
            control={control}
            name="hasDigitalThermometer"
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
            label="Comments"
            control={control}
            name="thermometerComments"
          >
            <Input.TextArea rows={2} />
          </FormItem>

          {/* BP Machine */}
          <FormItem
            required
            label="Functional BP Machine"
            control={control}
            name="hasBPMachine"
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
            label="Comments"
            control={control}
            name="bpMachineComments"
          >
            <Input.TextArea rows={2} />
          </FormItem>

          {/* MUAC Tape */}
          <FormItem
            required
            label="MUAC Tape"
            control={control}
            name="hasMUACTape"
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
            label="Comments"
            control={control}
            name="muacTapeComments"
          >
            <Input.TextArea rows={2} />
          </FormItem>

          {/* Glucometer & Strips */}
          <FormItem
            required
            label="Glucometer & Glucometer strips"
            control={control}
            name="hasGlucometerStrips"
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
            label="Comments"
            control={control}
            name="glucometerComments"
          >
            <Input.TextArea rows={2} />
          </FormItem>

          {/* ORS/Zinc Cu-PacKORS and Zinc */}
          <FormItem
            required
            label="ORS/Zinc Cu-PacKORS and Zinc"
            control={control}
            name="hasORS"
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
            label="Comments"
            control={control}
            name="orsComments"
          >
            <Input.TextArea rows={2} />
          </FormItem>

          {/* Amoxicillin tablets/Suspension */}
          <FormItem
            required
            label="Amoxicillin tablets/Suspension"
            control={control}
            name="hasAmoxicillin"
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
            label="Comments"
            control={control}
            name="amoxicillinComments"
          >
            <Input.TextArea rows={2} />
          </FormItem>

          {/* Paracetamol tablets/Suspension */}
          <FormItem
            required
            label="Paracetamol tablets/Suspension"
            control={control}
            name="hasParacetamol"
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
            label="Comments"
            control={control}
            name="paracetamolComments"
          >
            <Input.TextArea rows={2} />
          </FormItem>

          {/* Examination gloves */}
          <FormItem
            required
            label="Examination gloves"
            control={control}
            name="hasGloves"
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
            label="Comments"
            control={control}
            name="glovesComments"
          >
            <Input.TextArea rows={2} />
          </FormItem>

          {/* Condoms (Male/Female) */}
          <FormItem
            required
            label="Condoms (Male/Female)"
            control={control}
            name="hasCondoms"
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
            label="Comments"
            control={control}
            name="condomsComments"
          >
            <Input.TextArea rows={2} />
          </FormItem>

          {/* Malaria RDTs/Artemether/Lumefantrine */}
          <FormItem
            required
            label="Malaria RDTs/Artemether/Lumefantrine (Malaria zone)"
            control={control}
            name="hasRDTs"
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
            label="Comments"
            control={control}
            name="rdtsComments"
          >
            <Input.TextArea rows={2} />
          </FormItem>

          {/* Masks */}
          <FormItem
            required
            label="Masks"
            control={control}
            name="hasMasks"
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
            label="Comments"
            control={control}
            name="masksComments"
          >
            <Input.TextArea rows={2} />
          </FormItem>

          <Divider />
          <Title level={4}>Stock Management</Title>

          <FormItem
            required
            label="Have you experienced stock-outs of the CHU level Commodities in the last 3 months?"
            control={control}
            name="hasStockouts"
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
            label="Comments"
            control={control}
            name="stockoutComments"
          >
            <Input.TextArea rows={2} placeholder="Enter any comments about stock-outs" />
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

export default CommoditiesCHP;
