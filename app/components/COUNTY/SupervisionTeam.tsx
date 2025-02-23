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
  message,
} from 'antd';
import React, { useState, useEffect, useContext } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import dayjs from 'dayjs';
import { FormItem } from 'react-hook-form-antd';
import { AppContext } from '../providers';
import { kenyaCounties, kenyaSubcounties, kenyaChus } from './utils/commonData';
import CHUFunctionality from './CHUFunctionality';
import WorkplanPolicies from './WorkplanPolicies';
import ServiceDelivery from './ServiceDelivery';
import PandemicPreparedness from './PandemicPreparedness';

const { Title } = Typography;

const SupervisionTeam = (props) => {
  const store = useContext(AppContext);
  const [form] = Form.useForm();
  const { control, watch, getValues, reset } = useForm({});
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'teamMembers',
  });

  const numberOfMembers = watch('number_in_supervision_team', 0);
  const whoAreRespondents = watch('whoAreRespondents');

  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedSubCounty, setSelectedSubCounty] = useState('');
  const [selectedSubCounties, setSelectedSubCounties] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [selectedChus, setSelectedChus] = useState<
    Array<{ value: string; label: string }>
  >([]);

  //Debug logging for form values
  useEffect(() => {
    const values = getValues();
    console.log('Supervision Team current Values:', values);
  }, [getValues]);

  // Function to get subcounties for a given county
  const getSubCounties = (county: string) => {
    return kenyaSubcounties[county] || [];
  };

  // Function to get CHUs for a given county and subcounty
  const getChus = (county: string, subcounty: string) => {
    return kenyaChus[county]?.[subcounty] || [];
  };

  const handleCountyChange = (selectedValue: string) => {
    setSelectedCounty(selectedValue);
    setSelectedSubCounty('');
    const mySubcounties = getSubCounties(selectedValue);
    setSelectedSubCounties(mySubcounties);
    setSelectedChus([]);
  };

  const handleSubCountyChange = (selectedValue: string) => {
    setSelectedSubCounty(selectedValue);
    const myChus = getChus(selectedCounty, selectedValue);
    setSelectedChus(myChus);
  };

  useEffect(() => {
    return () => {
      props.setGlobalState((store) => {
        store.superVisionTeam = getValues();
        return store;
      });
    };
  }, [getValues, props]);

  useEffect(() => {
    reset(store.globalState.superVisionTeam);
  }, [store.globalState.superVisionTeam]);

  useEffect(() => {
    const currentCount = fields.length;
    if (numberOfMembers > currentCount) {
      for (let i = currentCount; i < numberOfMembers; i++) {
        append({ name: '', designation: '', organization: '' });
      }
    } else {
      for (let i = currentCount - 1; i >= numberOfMembers; i--) {
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
            <Row key={index} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col xs={24} sm={24} md={8} lg={8}>
                <FormItem
                  required
                  label={`Full Names of member ${index + 1}`}
                  control={control}
                  name={`teamMembers.${index}.name`}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your first, middle and last name',
                    },
                  ]}
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
                  name={`teamMembers.${index}.organization`}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your organization',
                    },
                  ]}
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
                  name={`teamMembers.${index}.designation`}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your designation',
                    },
                  ]}
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
        rules={[
          { required: true, message: 'Please input date of supervision' },
        ]}
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
          />
        </FormItem>
      )}

      {whoAreRespondents && (
        <>
          <Title level={5}>{whoAreRespondents}</Title>
          <FormItem
            required
            label="How long have you served in your current position/station?"
            control={control}
            name="how_long_served_in_position"
            rules={[
              { required: true, message: 'Duration served' },
              { min: 0, message: 'Select from the given options' },
            ]}
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
            name="county"
            rules={[
              { required: true, message: 'Select County' },
              { min: 3, message: 'Select from the drop down' },
            ]}
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
          {selectedCounty && (
            <FormItem
              required
              label="Sub County"
              control={control}
              name="subcounty"
              rules={[
                { required: true, message: 'Select Sub County' },
                { min: 3, message: 'Select from the drop down' },
              ]}
            >
              <Select
                size="large"
                placeholder="Please select a sub-county"
                style={{ width: '100%' }}
                options={selectedSubCounties}
                onChange={handleSubCountyChange}
              />
            </FormItem>
          )}
          {/* CHU Dropdown */}
          {selectedSubCounty && (
            <FormItem
              required
              label="Community Health Unit"
              control={control}
              name="chu"
              rules={[
                { required: true, message: 'Select CHU' },
                { min: 3, message: 'Select from the drop down' },
              ]}
            >
              <Select
                size="large"
                placeholder="Please select a CHU"
                style={{ width: '100%' }}
                options={selectedChus}
              />
            </FormItem>
          )}
        </>
      )}
    </Form>
  );
};

export default SupervisionTeam;
