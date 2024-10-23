"use client"
import { Form, Input, DatePicker, InputNumber } from 'antd';
import { useForm, useFieldArray } from "react-hook-form";
import Group from 'antd/es/input/Group';
import { Typography } from 'antd';
import { FormItem } from "react-hook-form-antd";
import { useEffect } from 'react';

const { Title } = Typography;
const SupervisionTeam = () => {
    const { control, watch } = useForm({
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'teamMembers', // name for the array
    });

    // Watch the "number" input to generate fields dynamically
    const numberOfMembers = watch('number_in_supervision_team', 0);

    // Dynamically update field array when the number input changes
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
            <FormItem label="Number of members in the supervision team" control={control} name="number_in_supervision_team">
                <InputNumber size="large" min={3} max={10} required={true} />
            </FormItem>

            {fields.length > 0 &&
                <>
                    <Title level={5}>Enter the following details of the Supervision Team</Title>
                    {fields.map((field, index) => (
                        <>
                            <FormItem label={`Full Names of member ${index + 1}`} control={control} name={`name_member_${index}`} required>
                                <Input style={{ width: '30%' }} placeholder={`Please enter the name of member ${index + 1}`} />
                            </FormItem>
                            <FormItem label={`Organisation of member ${index + 1}`} control={control} name={`name_member_${index}`} required>
                                <Input style={{ width: '30%' }} placeholder={`Please enter the Organisation of member ${index + 1}`} />
                            </FormItem>
                            <FormItem label={`Designation of member ${index + 1}`} control={control} name={`name_member_${index}`} required>
                                <Input style={{ width: '30%' }} placeholder={`Please enter the Designation of member ${index + 1}`} />
                            </FormItem>

                        </>
                    ))}
                </>
            }
            <Title level={3}>Supervision Site Details</Title>
            <FormItem label="Date of Supervision Visit" control={control} name='date'>
                <DatePicker />
            </FormItem>

            <FormItem label="Who are your respondents?" control={control} name='whoAreRespondents'>
                <Input />
            </FormItem>

            <FormItem label="How long have you served in your current position/station?" control={control} name='how_long_served_in_position'>
                <Input />
            </FormItem>
            <FormItem label="County" control={control} name='county'>
                <Input />
            </FormItem>
            <FormItem label="Sub County" control={control} name='subcounty'>
                <Input />
            </FormItem>
            <FormItem label="CHU Name & MCHUR Code" control={control} name='chu_code'>
                <Input />
            </FormItem>
            <FormItem label="Link Facility Name & MFR Code" control={control} name='link_facility_code'>
                <Input />
            </FormItem>
        </Form>
    );
};

export default SupervisionTeam;