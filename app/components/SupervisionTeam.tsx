'use client';

import {
  Form,
  Input,
  DatePicker,
  InputNumber,
  Row,
  Col,
  Select,
  Typography,
} from 'antd';
import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import dayjs from 'dayjs';
import { FormItem } from 'react-hook-form-antd';
import { kenyaCounties, kenyaSubcounties } from './utils/commonData';
import { type SubCounty, type SupervisionTeamProps } from './utils/Types';

const { Title } = Typography;

const SupervisionTeam: React.FC<SupervisionTeamProps> = (props) => {
  const { globalState, setGlobalState } = props;

  const { control, watch, getValues, reset } = useForm({});
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'teamMembers',
  });

  const numberOfMembers = watch('number_in_supervision_team', 0);
  const whoAreRespondents = watch('whoAreRespondents');

  const [selectedCounty, setSelectedCounty] = useState<string>('');
  const [selectedSubCounties, setSelectedSubCounties] = useState<SubCounty[]>(
    []
  );

  // Function to get subcounties for a given county
  const getSubCounties = (
    county: keyof typeof kenyaSubcounties
  ): SubCounty[] => {
    return kenyaSubcounties[county];
  };

  const handleCountyChange = (selectedValue: string): void => {
    setSelectedCounty(selectedValue);
    const mySubcounties = getSubCounties(
      selectedValue as keyof typeof kenyaSubcounties
    );
    setSelectedSubCounties(mySubcounties);
  };

  useEffect(() => {
    return () => {
      setGlobalState((store) => {
        const updatedStore = { ...store, superVisionTeam: getValues() };
        return updatedStore;
      });
    };
  }, [getValues, props, setGlobalState]);

  useEffect(() => {
    if (typeof globalState?.superVisionTeam === 'object') {
      reset(globalState.superVisionTeam);
    }
  }, [globalState?.superVisionTeam, reset]);

  useEffect(() => {
    const currentCount = fields.length;
    if (numberOfMembers > currentCount) {
      for (let i = currentCount; i < numberOfMembers; i += 1) {
        append({ name: '', designation: '', organization: '' });
      }
    } else {
      for (let i = currentCount - 1; i >= numberOfMembers; i -= 1) {
        remove(i);
      }
    }
  }, [numberOfMembers, append, remove, fields.length]);

  return (
    <Form layout="vertical">
      <Title level={3}>Supervision Team</Title>
      <FormItem
        required
        label="Number of members in the supervision team"
        control={control}
        name="number_in_supervision_team"
      >
        <InputNumber
          size="large"
          min={3}
          max={10}
          style={{ width: '50%' }}
          placeholder="Enter number of members in the supervision team"
        />
      </FormItem>

      {fields.length > 0 && (
        <>
          <Title level={5}>
            Enter the following details of the Supervision Team
          </Title>
          {fields.map((field, index) => (
            <Row key={field.id} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col xs={24} sm={24} md={8} lg={8}>
                <FormItem
                  required
                  label={`Full Names of member ${index + 1}`}
                  control={control}
                  name={`name_member_${index}`}
                >
                  <Input
                    size="large"
                    placeholder={`Please enter the name of member ${index + 1}`}
                  />
                </FormItem>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <FormItem
                  required
                  label={`Organisation of member ${index + 1}`}
                  control={control}
                  name={`organisation_member_${index}`}
                >
                  <Input
                    size="large"
                    placeholder={`Please enter the Organisation of member ${index + 1}`}
                  />
                </FormItem>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <FormItem
                  required
                  label={`Designation of member ${index + 1}`}
                  control={control}
                  name={`designation_member_${index}`}
                >
                  <Input
                    size="large"
                    placeholder={`Please enter the Designation of member ${index + 1}`}
                  />
                </FormItem>
              </Col>
            </Row>
          ))}
        </>
      )}

      <Title level={3}>Supervision Site Details</Title>
      <FormItem
        required
        label="Date of Supervision Visit"
        control={control}
        name="date"
      >
        <DatePicker
          size="large"
          style={{ width: '50%' }}
          format="DD/MM/YYYY"
          minDate={dayjs()}
          maxDate={dayjs()}
        />
      </FormItem>

      {fields.length > 0 && (
        <FormItem
          required
          label="Who are your respondents?"
          control={control}
          name="whoAreRespondents"
        >
          <Select
            mode="multiple"
            size="large"
            placeholder="Please select"
            style={{ width: '100%' }}
            options={[
              { value: 'CEC', label: 'CEC' },
              { value: 'COH', label: 'COH' },
              { value: 'CDH', label: 'CDH' },
              { value: 'CCHSFP', label: 'CCHSFP' },
              { value: 'CDSC', label: 'CDSC' },
              { value: 'CHRIO', label: 'CHRIO' },
              { value: 'CPHCC', label: 'CPHCC' },
              { value: 'CQIC', label: 'CQIC' },
              { value: 'SCMOH', label: 'SCMOH' },
              { value: 'SCCHSFP', label: 'SCCHSFP' },
              { value: 'SCDSC', label: 'SCDSC' },
              { value: 'SCHRIO', label: 'SCHRIO' },
              { value: 'CHA', label: 'CHA' },
              { value: 'CHC Member', label: 'CHC Member' },
              { value: 'CHP', label: 'CHP' },
            ]}
            maxCount={fields.length}
          />
        </FormItem>
      )}

      {whoAreRespondents?.length > 0 && (
        <>
          {whoAreRespondents.map((field: string, index: number) => (
            <div key={field}>
              <Title level={5}>{whoAreRespondents[index]}</Title>

              <FormItem
                required
                label="How long have you served in your current position/station?"
                control={control}
                name={`how_long_served_in_position_${index}`}
              >
                <Select
                  size="large"
                  placeholder="Please select"
                  style={{ width: '100%' }}
                  options={[
                    { value: '<1', label: 'Less than a year' },
                    { value: '1-3', label: '1 to 3 years' },
                    { value: '3>', label: 'More than 3 years' },
                  ]}
                />
              </FormItem>

              {/* County Dropdown */}
              <FormItem
                required
                label="County"
                control={control}
                name={`county_${index}`}
              >
                <Select
                  size="large"
                  placeholder="Please select a county"
                  style={{ width: '100%' }}
                  options={kenyaCounties}
                  onChange={handleCountyChange}
                />
              </FormItem>

              {/* Sub-County Dropdown */}
              {selectedCounty.length > 0 && (
                <FormItem
                  required
                  label="Sub County"
                  control={control}
                  name={`subcounty_${index}`}
                >
                  <Select
                    size="large"
                    placeholder="Please select a sub-county"
                    style={{ width: '100%' }}
                    options={selectedSubCounties}
                  />
                </FormItem>
              )}
            </div>
          ))}
        </>
      )}
    </Form>
  );
};

export default SupervisionTeam;
