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
  Button,
} from 'antd';
import React, { useState, useEffect, useContext } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import dayjs from 'dayjs';
import { FormItem } from 'react-hook-form-antd';
import { AppContext } from '../providers';
import {
  getCounties,
  getSubCounties,
  getWards,
  getCHUs,
} from '../services/locationData';
import CHUFunctionality from './CHUFunctionality';
import WorkplanPolicies from './WorkplanPolicies';
import ServiceDelivery from './ServiceDelivery';
import PandemicPreparedness from './PandemicPreparedness';
import CHAAssessment from './CHAAssessment';
import CHPAssessment from './CHPAssessment';

const { Title } = Typography;

const COUNTY_LEVEL_ROLES = [
  'CEC',
  'COH',
  'CDH',
  'CCHSFP',
  'CDSC',
  'CHRIO',
  'CPHCC',
  'CQIC',
];

const SUBCOUNTY_LEVEL_ROLES = ['SCMOH', 'SCCHSFP', 'SCDSC', 'SCHRIO'];

const CHU_LEVEL_ROLES = ['CHA', 'CHC Member', 'CHP'];

const SupervisionTeam = (props) => {
  const store = useContext(AppContext);
  const [form] = Form.useForm();
  const [showCHAAssessment, setShowCHAAssessment] = useState(false);
  const [showCHPAssessment, setShowCHPAssessment] = useState(false);
  const [showOfficialAssessment, setShowOfficialAssessment] = useState(false);
  const { control, watch, getValues, reset, handleSubmit } = useForm({
    defaultValues: {
      county: '',
      subCounty: '',
      chu: '',
      date: '',
      number_in_supervision_team: 0,
      whoAreRespondents: [] as string[],
      teamMembers: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'teamMembers',
  });

  const numberOfMembers = watch('number_in_supervision_team', 0);
  const whoAreRespondents = watch('whoAreRespondents');
  const selectedRole = watch('whoAreRespondents')?.[0] || null;

  // Reset location fields when role changes
  useEffect(() => {
    if (selectedRole) {
      setSelectedSubCounty('');
      setSelectedWard('');
      setSelectedCHU('');
      setSubCounties([]);
      setWards([]);
      setCHUs([]);
    }
  }, [selectedRole]);

  const hasCountyLevelRole = COUNTY_LEVEL_ROLES.includes(selectedRole);
  const hasSubCountyLevelRole = SUBCOUNTY_LEVEL_ROLES.includes(selectedRole);
  const hasCHULevelRole = CHU_LEVEL_ROLES.includes(selectedRole);

  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedSubCounty, setSelectedSubCounty] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [selectedCHU, setSelectedCHU] = useState('');
  const [counties, setCounties] = useState<string[]>([]);
  const [subCounties, setSubCounties] = useState<string[]>([]);
  const [wards, setWards] = useState<string[]>([]);
  const [chus, setCHUs] = useState<string[]>([]);
  const [selectedSubCounties, setSelectedSubCounties] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [selectedChus, setSelectedChus] = useState<
    Array<{ value: string; label: string }>
  >([]);

  // Debug logging for form values
  useEffect(() => {
    const values = getValues();
    console.log('Supervision Team current Values:', values);
  }, [getValues]);

  // Load initial counties
  useEffect(() => {
    let mounted = true;
    const loadCounties = async () => {
      try {
        console.log('Starting to load counties...');
        console.log('Current environment:', {
          // Using mock data for now, will be replaced with PostgreSQL later
          mockData: true,
        });

        const countiesList = await getCounties();
        console.log('Counties loaded successfully:', countiesList);

        if (countiesList.length === 0) {
          console.warn('No counties found in database');
          message.warning('No counties found in the database');
        } else {
          console.log('Setting counties in state:', countiesList);
          if (mounted) {
            setCounties(countiesList);
          }
        }
      } catch (error: any) {
        console.error('Error loading counties:', error);
        console.error('Error details:', {
          message: error.message,
          code: error.code,
          type: error.type,
          response: error.response,
        });
        message.error(
          'Failed to load counties. Please try refreshing the page.'
        );
      }
    };

    console.log('Counties useEffect triggered');
    loadCounties();
    return () => {
      mounted = false;
    };
  }, []);

  // Load sub-counties when county or role changes
  useEffect(() => {
    const loadSubCounties = async () => {
      if (selectedCounty && (hasSubCountyLevelRole || hasCHULevelRole)) {
        try {
          const subCountiesList = await getSubCounties(selectedCounty);
          setSubCounties(subCountiesList);
          setSelectedSubCounties(
            subCountiesList.map((sc) => ({ value: sc, label: sc }))
          );
        } catch (error) {
          console.error('Error loading sub-counties:', error);
          message.error('Failed to load sub-counties');
        }
      } else {
        setSubCounties([]);
        setSelectedSubCounties([]);
      }
    };
    loadSubCounties();
  }, [selectedCounty, hasSubCountyLevelRole, hasCHULevelRole]);

  // Load wards when sub-county changes or role changes
  useEffect(() => {
    const loadWards = async () => {
      if (selectedCounty && selectedSubCounty && hasCHULevelRole) {
        try {
          const wardsList = await getWards(selectedCounty, selectedSubCounty);
          setWards(wardsList);
        } catch (error) {
          console.error('Error loading wards:', error);
          message.error('Failed to load wards');
        }
      } else {
        setWards([]);
      }
    };
    loadWards();
  }, [selectedCounty, selectedSubCounty, hasCHULevelRole]);

  // Load CHUs when ward changes or role changes
  useEffect(() => {
    const loadCHUs = async () => {
      if (
        selectedCounty &&
        selectedSubCounty &&
        selectedWard &&
        hasCHULevelRole
      ) {
        try {
          const chusList = await getCHUs(
            selectedCounty,
            selectedSubCounty,
            selectedWard
          );
          setCHUs(chusList);
          setSelectedChus(chusList.map((chu) => ({ value: chu, label: chu })));
        } catch (error) {
          console.error('Error loading CHUs:', error);
          message.error('Failed to load CHUs');
        }
      } else {
        setCHUs([]);
        setSelectedChus([]);
      }
    };
    loadCHUs();
  }, [selectedCounty, selectedSubCounty, selectedWard, hasCHULevelRole]);

  const handleCountyChange = async (selectedValue: string) => {
    try {
      console.log('County selected:', selectedValue);
      setSelectedCounty(selectedValue);
      setSelectedSubCounty('');
      setSelectedWard('');
      form.setFieldsValue({
        county: selectedValue,
        subCounty: undefined,
        ward: undefined,
        chu: undefined,
      });

      // Only load sub-counties if role requires it
      if (hasSubCountyLevelRole || hasCHULevelRole) {
        const subcounties = await getSubCounties(selectedValue);
        console.log('Loaded subcounties:', subcounties);
        setSubCounties(subcounties);
      } else {
        setSubCounties([]);
      }

      // Clear dependent fields
      setSelectedSubCounties([]);
      setWards([]);
      setCHUs([]);
    } catch (error) {
      console.error('Error in handleCountyChange:', error);
      message.error('Failed to load sub-counties');
    }
  };

  const handleSubCountyChange = async (selectedValue: string) => {
    try {
      console.log('SubCounty selected:', selectedValue);
      setSelectedSubCounty(selectedValue);
      setSelectedWard('');
      form.setFieldsValue({
        subCounty: selectedValue,
        ward: undefined,
        chu: undefined,
      });

      // Only load wards if role is CHU level
      if (hasCHULevelRole) {
        const wardsList = await getWards(selectedCounty, selectedValue);
        console.log('Loaded wards:', wardsList);
        setWards(wardsList);
      } else {
        setWards([]);
      }

      // Clear dependent fields
      setCHUs([]);
    } catch (error) {
      console.error('Error in handleSubCountyChange:', error);
      message.error('Failed to load wards');
    }
  };

  const handleWardChange = async (selectedValue: string) => {
    try {
      console.log('Ward selected:', selectedValue);
      setSelectedWard(selectedValue);
      form.setFieldsValue({
        ward: selectedValue,
        chu: undefined,
      });

      // Only load CHUs if role is CHU level
      if (hasCHULevelRole) {
        const chusList = await getCHUs(
          selectedCounty,
          selectedSubCounty,
          selectedValue
        );
        console.log('Loaded CHUs:', chusList);
        setCHUs(chusList);
      } else {
        setCHUs([]);
      }
    } catch (error) {
      console.error('Error in handleWardChange:', error);
      message.error('Failed to load CHUs');
    }
  };

  const handleCHUChange = (selectedValue: string) => {
    try {
      console.log('CHU selected:', selectedValue);
      form.setFieldsValue({ chu: selectedValue });
    } catch (error) {
      console.error('Error in handleCHUChange:', error);
      message.error('Failed to set CHU');
    }
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
    const loadData = async () => {
      if (store.globalState.superVisionTeam) {
        reset(store.globalState.superVisionTeam);
        // Also set the location states if they exist
        const values = store.globalState.superVisionTeam;
        if (values.county) {
          setSelectedCounty(values.county);
          const subcounties = await getSubCounties(values.county);
          setSelectedSubCounties(subcounties);

          if (values.subCounty && values.ward) {
            setSelectedSubCounty(values.subCounty);
            const chus = await getCHUs(
              values.county,
              values.subCounty,
              values.ward
            );
            setSelectedChus(chus);
          }
        }
      }
    };
    loadData();
  }, [store.globalState.superVisionTeam, reset]);

  useEffect(() => {
    const currentCount = fields.length;
    if (numberOfMembers > currentCount) {
      for (let i = currentCount; i < numberOfMembers; i++) {
        append({ name: '', designation: '', organization: '' });
      }
    } else if (numberOfMembers < currentCount) {
      for (let i = currentCount - 1; i >= numberOfMembers; i--) {
        remove(i);
      }
    }
  }, [numberOfMembers]);

  const onSubmit = async (data: any) => {
    try {
      // Get the current form values
      const formValues = form.getFieldsValue();
      const allData = {
        ...data,
        ...formValues,
        county: selectedCounty,
        subCounty: selectedSubCounty,
        ward: selectedWard,
        date: formValues.date?.format('YYYY-MM-DD'),
        teamMembers: fields.map((field, index) => ({
          name: data.teamMembers?.[index]?.name || '',
          organization: data.teamMembers?.[index]?.organization || '',
          designation: data.teamMembers?.[index]?.designation || '',
        })),
      };

      console.log('Form data to submit:', allData);

      // Save to global state
      props.setGlobalState((store) => {
        store.superVisionTeam = allData;
        return store;
      });

      message.success('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('Failed to submit form');
    }
  };

  const handleFormFinish = () => {
    handleSubmit(onSubmit)();
  };

  // Show CHA Assessment if CHA is selected and all required fields are filled
  if (showCHPAssessment && selectedCHU) {
    return (
      <CHPAssessment
        initialData={{
          timeInPosition: watch('how_long_served_in_position'),
          county: selectedCounty,
          subCounty: selectedSubCounty,
          ward: selectedWard,
          chu: selectedCHU,
        }}
        onBack={() => {
          setShowCHPAssessment(false);
        }}
      />
    );
  }

  if (showCHAAssessment && selectedCHU) {
    return (
      <CHAAssessment
        initialData={{
          timeInPosition: watch('how_long_served_in_position'),
          county: selectedCounty,
          subCounty: selectedSubCounty,
          ward: selectedWard,
          chu: selectedCHU,
        }}
        onBack={() => {
          setShowCHAAssessment(false);
        }}
      />
    );
  }

  // Show Official Assessment if county/sub-county official is selected and required fields are filled
  if (
    showOfficialAssessment &&
    watch('how_long_served_in_position') &&
    ((hasCountyLevelRole && selectedCounty) ||
      (hasSubCountyLevelRole && selectedCounty && selectedSubCounty))
  ) {
    return (
      <div className="container mx-auto px-4">
        <Card className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <Title level={3}>Official Assessment</Title>
            <Button
              type="default"
              onClick={() => {
                setShowOfficialAssessment(false);
              }}
            >
              Back to Supervision Form
            </Button>
          </div>

          <Descriptions bordered column={2}>
            <Descriptions.Item label="Role">{selectedRole}</Descriptions.Item>
            <Descriptions.Item label="Time in Position">
              {watch('how_long_served_in_position')}
            </Descriptions.Item>
            <Descriptions.Item label="County">
              {selectedCounty}
            </Descriptions.Item>
            {hasSubCountyLevelRole && (
              <Descriptions.Item label="Sub-County">
                {selectedSubCounty}
              </Descriptions.Item>
            )}
          </Descriptions>
        </Card>

        <CHUFunctionality />
        <WorkplanPolicies />
        <ServiceDelivery />
        <PandemicPreparedness />
      </div>
    );
  }

  return (
    <Form layout="vertical" onFinish={handleFormFinish}>
      <Title level={3}>Supervision Team</Title>

      <FormItem
        required
        label="Number of members in the supervision team"
        control={control}
        name="number_in_supervision_team"
        rules={[
          {
            required: true,
            type: 'number',
            min: 3,
            max: 10,
            message: 'Number of members should be between 3 and 10',
          },
        ]}
      >
        <InputNumber
          size="large"
          min={3}
          max={10}
          style={{ width: '50%' }}
          placeholder="Enter number of members in the supervision team"
          onChange={(value) => {
            if (value) {
              form.setFieldValue('number_in_supervision_team', value);
            }
          }}
        />
      </FormItem>

      {numberOfMembers > 0 && (
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
                    defaultValue={field.name}
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
                    defaultValue={field.organization}
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
                    defaultValue={field.designation}
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
      <FormItem
        required
        label="Level of supervision"
        control={control}
        name="Levelofsupervision"
        rules={[{ required: true, message: 'Please select respondent' }]}
      >
        <Select
          size="large"
          placeholder="Please select"
          style={{ width: '100%' }}
          onChange={(value) => {
            // Update form state
            form.setFieldsValue({
              Levelofsupervision: value,
              whoAreRespondents: [],
            });
            // Reset React Hook Form
            reset({
              ...getValues(),
              Levelofsupervision: value,
              whoAreRespondents: [],
            });
          }}
          options={[
            { value: 'county', label: 'County' },
            { value: 'sub-county', label: 'Sub-County' },
            { value: 'CHU', label: 'CHU' },
          ]}
        />
</FormItem>
      <FormItem
        required
        label="Who are your respondents?"
        control={control}
        name="whoAreRespondents"
        rules={[{ required: true, message: 'Please select respondent' }]}
      >
        <Select
          size="large"
          placeholder="Please select"
          style={{ width: '100%' }}
          onChange={(value) => {
            // Reset assessment states
            setShowCHAAssessment(false);
            setShowCHPAssessment(false);
            setShowOfficialAssessment(false);

            // Set appropriate assessment type
            if (value === 'CHA') {
              setShowCHAAssessment(true);
            } else if (value === 'CHP') {
              setShowCHPAssessment(true);
            } else if (
              COUNTY_LEVEL_ROLES.includes(value) ||
              SUBCOUNTY_LEVEL_ROLES.includes(value)
            ) {
              setShowOfficialAssessment(true);
            }

            // Update form state
            form.setFieldsValue({
              whoAreRespondents: value ? [value] : [],
              county: undefined,
              subCounty: undefined,
              ward: undefined,
              chu: undefined,
            });

            // Clear all location states
            setSelectedCounty('');
            setSelectedSubCounty('');
            setSelectedWard('');
            setSelectedCHU('');
            setSubCounties([]);
            setWards([]);
            setCHUs([]);

            // Update React Hook Form
            reset({
              ...getValues(),
              whoAreRespondents: value ? [value] : [],
              county: undefined,
              subCounty: undefined,
              ward: undefined,
              chu: undefined,
            });
          }}
          value={whoAreRespondents?.[0]}
          options={(() => {
            const level = form.getFieldValue('Levelofsupervision');
            switch (level) {
              case 'county':
                return [
                  { value: 'CEC', label: 'CEC' },
                  { value: 'COH', label: 'COH' },
                  { value: 'CDH', label: 'CDH' },
                  { value: 'CCHSFP', label: 'CCHSFP' },
                  { value: 'CDSC', label: 'CDSC' },
                  { value: 'CHRIO', label: 'CHRIO' },
                  { value: 'CPHCC', label: 'CPHCC' },
                  { value: 'CQIC', label: 'CQIC' },
                ];
              case 'sub-county':
                return [
                  { value: 'SCMOH', label: 'SCMOH' },
                  { value: 'SCCHSFP', label: 'SCCHSFP' },
                  { value: 'SCDSC', label: 'SCDSC' },
                  { value: 'SCHRIO', label: 'SCHRIO' },
                ];
              case 'CHU':
                return [
                  { value: 'CHA', label: 'CHA' },
                  { value: 'CHC Member', label: 'CHC Member' },
                  { value: 'CHP', label: 'CHP' },
                ];
              default:
                return [];
            }
          })()}
        />
      </FormItem>

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
          {/* Location Dropdowns */}
          <Row gutter={16}>
            {/* County dropdown - always visible */}
            <Col span={hasCountyLevelRole ? 24 : 12}>
              <FormItem
                required
                label="County"
                control={control}
                name="county"
                rules={[{ required: true, message: 'Select County' }]}
              >
                <Select
                  size="large"
                  placeholder="Select County"
                  style={{ width: '100%' }}
                  value={selectedCounty}
                  onChange={(value) => {
                    setSelectedCounty(value);
                    form.setFieldsValue({
                      county: value,
                      subCounty: undefined,
                      ward: undefined,
                      chu: undefined,
                    });
                    setSelectedSubCounty('');
                    setSelectedWard('');
                    setSelectedCHU('');
                    setSubCounties([]);
                    setWards([]);
                    setCHUs([]);

                    if (value) {
                      getSubCounties(value).then((data) => {
                        if (hasSubCountyLevelRole || hasCHULevelRole) {
                          setSubCounties(data);
                        }
                      });
                    }
                  }}
                  options={counties.map((county) => ({
                    value: county,
                    label: county,
                  }))}
                />
              </FormItem>
            </Col>

            {/* Sub-county dropdown - visible for sub-county and CHU roles */}
            {(hasSubCountyLevelRole || hasCHULevelRole) && (
              <Col span={12}>
                <FormItem
                  required
                  label="Sub County"
                  control={control}
                  name="subCounty"
                  rules={[{ required: true, message: 'Select Sub County' }]}
                >
                  <Select
                    size="large"
                    placeholder="Select Sub County"
                    style={{ width: '100%' }}
                    value={selectedSubCounty}
                    onChange={(value) => {
                      setSelectedSubCounty(value);
                      form.setFieldsValue({
                        subCounty: value,
                        ward: undefined,
                        chu: undefined,
                      });
                      setSelectedWard('');
                      setSelectedCHU('');
                      setWards([]);
                      setCHUs([]);

                      if (value && hasCHULevelRole) {
                        getWards(selectedCounty, value).then((data) => {
                          setWards(data);
                        });
                      }
                    }}
                    options={subCounties.map((sc) => ({
                      value: sc,
                      label: sc,
                    }))}
                    disabled={!selectedCounty}
                  />
                </FormItem>
              </Col>
            )}
          </Row>

          {/* Ward and CHU dropdowns - only visible for CHU roles */}
          {hasCHULevelRole && (
            <Row gutter={16}>
              <Col span={12}>
                <FormItem
                  required
                  label="Ward"
                  control={control}
                  name="ward"
                  rules={[{ required: true, message: 'Select Ward' }]}
                >
                  <Select
                    size="large"
                    placeholder="Select Ward"
                    style={{ width: '100%' }}
                    value={selectedWard}
                    onChange={(value) => {
                      setSelectedWard(value);
                      form.setFieldsValue({
                        ward: value,
                        chu: undefined,
                      });
                      setSelectedCHU('');
                      setCHUs([]);

                      if (value) {
                        getCHUs(selectedCounty, selectedSubCounty, value).then(
                          (data) => {
                            setCHUs(data);
                          }
                        );
                      }
                    }}
                    options={wards.map((ward) => ({
                      value: ward,
                      label: ward,
                    }))}
                    disabled={!selectedSubCounty}
                  />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  required
                  label="CHU"
                  control={control}
                  name="chu"
                  rules={[{ required: true, message: 'Select CHU' }]}
                >
                  <Select
                    size="large"
                    placeholder="Select CHU"
                    style={{ width: '100%' }}
                    value={selectedCHU}
                    onChange={(value) => {
                      setSelectedCHU(value);
                      form.setFieldsValue({ chu: value });

                      // Redirect based on role when CHU is selected
                      if (value) {
                        const role = whoAreRespondents?.[0];
                        switch (role) {
                          case 'CHA':
                            router.push('/cha-assessment');
                            break;
                          case 'CHC Member':
                            router.push('/chc-assessment');
                            break;
                          case 'CHP':
                            router.push('/chp-assessment');
                            break;
                        }
                      }
                    }}
                    options={chus.map((chu) => ({ value: chu, label: chu }))}
                    disabled={!selectedWard}
                  />
                </FormItem>
              </Col>
            </Row>
          )}
        </>
      )}
    </Form>
  );
};

export default SupervisionTeam;
