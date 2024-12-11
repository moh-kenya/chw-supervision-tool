"use client"
import React from 'react';
import { Form, Radio } from 'antd';
import { useForm } from 'react-hook-form'; // Import useForm from RHF
import FormItem from 'antd/es/form/FormItem';
import { Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;
const { Group } = Radio;
const RadioGroup = Group;

const Infrastructure = () => {
  const { register, handleSubmit, formState: { errors } } = useForm(); // Initialize RHF

  const onSubmit = (data) => {
    console.log(data); // Handle form data on submit
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Title level={2}>Infrastructure</Title>

      {/* Designated Office */}
      <FormItem required label="Do all your link facilities have office space for community health?">
        <RadioGroup {...register('officeSpace')} defaultValue="yes">
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>

      {/* Comment/Remarks */}
      <FormItem required label="Comment/Remarks">
        <TextArea 
          rows={3} 
          size={'large'} 
          placeholder='Please enter comments or remarks'
          {...register('remarks1')} // Register field
        />
      </FormItem>

      {/* ICT Infrastructure */}
      <FormItem required label="Do all your CHUs have access to the ICT infrastructure (Desktop/Laptop & Internet)?">
        <RadioGroup {...register('ictInfrastructure')} defaultValue="yes">
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>

      {/* Comment/Remarks */}
      <FormItem required label="Comment/Remarks">
        <TextArea 
          rows={3} 
          size={'large'} 
          placeholder='Please enter comments or remarks'
          {...register('remarks2')} // Register field
        />
      </FormItem>

      {/* Inventory Document for CH Office */}
      <FormItem required label="Do you have an inventory document for CH office?">
        <RadioGroup {...register('inventoryDocument')} defaultValue="yes">
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>

      {/* Up-to-date Inventory of CHS Equipment */}
      <FormItem required label="Do you have an up-to-date inventory of all the CHS equipment? (e.g., CHP kits, Mobile phones etc—confirm with the inventory document)">
        <RadioGroup {...register('upToDateInventory')} defaultValue="yes">
          <Radio value={'yes'}>Yes</Radio>
          <Radio value={'no'}>No</Radio>
        </RadioGroup>
      </FormItem>

      {/* Comment */}
      <FormItem label="Comment">
        <TextArea 
          rows={3} 
          size={'large'} 
          {...register('generalComment')} // Register field
        />
      </FormItem>

      <button type="submit">Submit</button> 
    </Form>
  );
};

export default Infrastructure;
