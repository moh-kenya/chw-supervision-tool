'use client';

import { useContext, useEffect, useState } from 'react';
import { Form, Select, Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { AppContext } from '../providers';

const { Title } = Typography;

const LocationDetails = (props) => {
  const disabled = props.disabled || false;
  const store = useContext(AppContext);

  const { control, getValues, reset } = useForm({
    defaultValues: {
      county: '',
      subCounty: '',
      chu: ''
    }
  });

  const [counties] = useState([
    { value: 'bungoma', label: 'Bungoma' },
    
  ]);

  const [subCounties, setSubCounties] = useState([]);
  const [chus, setChus] = useState([]);

  useEffect(() => {
    return () => {
      props.setGlobalState((store) => {
        store.locationDetails = getValues();
        return store;
      });
    };
  }, [getValues, props]);

  useEffect(() => {
    reset(store?.globalState?.locationDetails);
  }, [reset, store?.globalState?.locationDetails]);

  // Function to get subcounties for a given county
  const handleCountyChange = (county) => {
    if (county === 'bungoma') {
      setSubCounties([
        { value: 'bumula', label: 'Bumula' },
        { value: 'kabuchai', label: 'Kabuchai' },
        { value: 'kanduyi', label: 'Kanduyi' },
        { value: 'kimilili', label: 'Kimilili' },
        { value: 'mt_elgon', label: 'Mt Elgon' },
        { value: 'sirisia', label: 'Sirisia' },
        { value: 'tongaren', label: 'Tongaren' },
        { value: 'webuye_east', label: 'Webuye East' },
        { value: 'webuye_west', label: 'Webuye West' },
      ]);
    } else {
      setSubCounties([]);
    }
    setChus([]);
  };

  // Function to get CHUs for a given subcounty
  const handleSubCountyChange = (subCounty) => {
    // Add CHUs based on the selected subcounty
    setChus([
      { value: 'chu1', label: 'CHU 1' },
      { value: 'chu2', label: 'CHU 2' },
      { value: 'chu3', label: 'CHU 3' },
    ]);
  };

  return (
    <Form layout="vertical">
      <Title level={2}>Supervision Site Details</Title>

      <Form.Item
        label="County"
        required
      >
        <Controller
          name="county"
          control={control}
          rules={{ required: 'Please select a county' }}
          render={({ field }) => (
            <Select
              {...field}
              disabled={disabled}
              placeholder="Select County"
              options={counties}
              onChange={(value) => {
                field.onChange(value);
                handleCountyChange(value);
              }}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Sub County"
        required
      >
        <Controller
          name="subCounty"
          control={control}
          rules={{ required: 'Please select a sub county' }}
          render={({ field }) => (
            <Select
              {...field}
              disabled={disabled || !getValues('county')}
              placeholder="Select Sub County"
              options={subCounties}
              onChange={(value) => {
                field.onChange(value);
                handleSubCountyChange(value);
              }}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Community Health Unit"
        required
      >
        <Controller
          name="chu"
          control={control}
          rules={{ required: 'Please select a CHU' }}
          render={({ field }) => (
            <Select
              {...field}
              disabled={disabled || !getValues('subCounty')}
              placeholder="Select CHU"
              options={chus}
            />
          )}
        />
      </Form.Item>
    </Form>
  );
};

export default LocationDetails;
