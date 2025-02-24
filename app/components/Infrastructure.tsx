'use client';

import { useContext, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Radio, Typography, Form as AntForm } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { AppContext } from '../providers';

const { Title } = Typography;
const { Group: RadioGroup } = Radio;

const Infrastructure = (props) => {
  const disabled = props.disabled || false;
  const store = useContext(AppContext);

  const { control, getValues, reset, watch } = useForm({
    defaultValues: {
      have_designated_office: '',
      has_access_to_ict_infra: '',
      have_inventory_document: '',
      upto_date_inventory_chs_equipment: '',
      comments_infrastructure: ''
    }
  });

  useEffect(() => {
    return () => {
      props.setGlobalState((store) => {
        store.infrastructure = getValues();
        return store;
      });
    };
  }, [getValues, props]);

  useEffect(() => {
    reset(store?.globalState?.infrastructure);
  }, [reset, store?.globalState?.infrastructure]);

  return (
    <AntForm layout="vertical">
      <Title level={2}>Infrastructure</Title>

      {/* Designated Office */}
      <AntForm.Item
        label="Do all your link facilities have office space for community health?"
        required
      >
        <Controller
          name="have_designated_office"
          control={control}
          rules={{ required: 'Please select an option' }}
          render={({ field }) => (
            <RadioGroup {...field} disabled={disabled}>
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </RadioGroup>
          )}
        />
      </AntForm.Item>

      {/* ICT Infrastructure */}
      <AntForm.Item
        label="Do all your CHUs have access to the ICT infrastructure (Desktop/Laptop & Internet)?"
        required
      >
        <Controller
          name="has_access_to_ict_infra"
          control={control}
          rules={{ required: 'Please select an option' }}
          render={({ field }) => (
            <RadioGroup {...field} disabled={disabled}>
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </RadioGroup>
          )}
        />
      </AntForm.Item>

      {/* Inventory Document for CH Office */}
      {watch('have_designated_office') === 'yes' && (
        <AntForm.Item
          label="Do you have an inventory document for CH office?"
          required
        >
          <Controller
            name="have_inventory_document"
            control={control}
            rules={{ required: 'Please select an option' }}
            render={({ field }) => (
              <RadioGroup {...field} disabled={disabled}>
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </RadioGroup>
            )}
          />
        </AntForm.Item>
      )}

      {/* Up-to-date Inventory of CHS Equipment */}
      <AntForm.Item
        label="Do you have an up-to-date inventory of all the CHS equipment? (e.g., CHP kits, Mobile phones, etc.)"
        required
      >
        <Controller
          name="upto_date_inventory_chs_equipment"
          control={control}
          rules={{ required: 'Please select an option' }}
          render={({ field }) => (
            <RadioGroup {...field} disabled={disabled}>
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </RadioGroup>
          )}
        />
      </AntForm.Item>

      {/* Comments */}
      <AntForm.Item label="Comments">
        <Controller
          name="comments_infrastructure"
          control={control}
          render={({ field }) => (
            <TextArea
              {...field}
              rows={4}
              disabled={disabled}
            />
          )}
        />
      </AntForm.Item>
    </AntForm>
  );
};

export default Infrastructure;
