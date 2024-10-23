"use client"
import { Form, Input, DatePicker, InputNumber, Row, Col, Select } from 'antd';
import { useForm, useFieldArray } from "react-hook-form";
import dayjs from 'dayjs';
import { Typography } from 'antd';
import { FormItem } from "react-hook-form-antd";
import { useEffect } from 'react';
import { AppContext } from '../page';

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
    const whoAreRespondents = watch('whoAreRespondents');
    const chuCode = watch('chu_code');
    const respondentoptions = [
        {
            value: "CEC",
            label: "CEC"
        },
        {
            value: "COH",
            label: "COH"
        },
        {
            value: "CDH",
            label: "CDH"
        },
        {
            value: "CCHSFP",
            label: "CCHSFP"
        },
        {
            value: "CDSC",
            label: "CDSC"
        },
        {
            value: "CHRIO",
            label: "CHRIO"
        },
        {
            value: "CPHCC",
            label: "CPHCC"
        },
        {
            value: "CQIC",
            label: "CQIC"
        },
        {
            value: "SCMOH",
            label: "SCMOH"
        },
        {
            value: "SCCHSFP",
            label: "SCCHSFP"
        },
        {
            value: "SCDSC",
            label: "SCDSC"
        },
        {
            value: "SCHRIO",
            label: "SCHRIO"
        },
        {
            value: "CHA",
            label: "CHA"
        },
        {
            value: "CHC Member",
            label: "CHC Member"
        },
        {
            value: "CHP",
            label: "CHP"
        }
    ];
    const durationOptions = [{
        value: "<1",
        label: "Less than a year"
    },
    {
        value: "1-3",
        label: "1 to 3 years"
    },
    {
        value: "3>",
        label: "More than 3 years"
    }]


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
            <FormItem label="Number of members in the supervision team" control={control} name="number_in_supervision_team" required>
                <InputNumber size="large" min={3} max={10} required={true} style={{ width: '50%' }} placeholder='Enter number of members in the supervision team' />
            </FormItem>

            {fields.length > 0 &&
                <>
                    <Title level={5}>Enter the following details of the Supervision Team</Title>

                    {fields.map((field, index) => (
                        <Row key={index} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col xs={24} sm={24} md={8} lg={8}>
                                <FormItem label={`Full Names of member ${index + 1}`} control={control} name={`name_member_${index}`} required>
                                    <Input size="large" placeholder={`Please enter the name of member ${index + 1}`} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8}>
                                <FormItem label={`Organisation of member ${index + 1}`} control={control} name={`organisation_member_${index}`} required>
                                    <Input placeholder={`Please enter the Organisation of member ${index + 1}`} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8}>
                                <FormItem label={`Designation of member ${index + 1}`} control={control} name={`designation_member_${index}`} required>
                                    <Input placeholder={`Please enter the Designation of member ${index + 1}`} />
                                </FormItem>
                            </Col>

                        </Row>
                    ))}
                </>

            }
            <Title level={3}>Supervision Site Details</Title>
            <FormItem label="Date of Supervision Visit" control={control} name='date' required>
                <DatePicker size="large" style={{ width: '50%' }} format={"DD/MM/YYYY"}
                    minDate={dayjs()}
                    maxDate={dayjs()} />
            </FormItem>

            <FormItem label="Who are your respondents?" control={control} name='whoAreRespondents'>
                <Select
                    mode="multiple"
                    size={"large"}
                    placeholder="Please select"
                    style={{ width: '100%' }}
                    options={respondentoptions}
                    maxCount={fields.length}
                />
            </FormItem>
            {whoAreRespondents?.length > 0 &&
                <>
                    {
                        whoAreRespondents.map((field, index) => (
                            <>
                                <Title level={5}>{whoAreRespondents[index]}</Title>
                                <FormItem label={`How long have you served in your current position/station?`} control={control} name='how_long_served_in_position' key={index}>
                                    <Select
                                        size={"large"}
                                        placeholder="Please select"
                                        style={{ width: '100%' }}
                                        options={durationOptions}
                                    />
                                </FormItem >
                                {["SCMOH", "SCCHSFP", "SCDSC", "SCHRIO", "CHA", "CHC Member", "CHP"].includes(whoAreRespondents[index]) ||
                                    <FormItem label="County" control={control} name='county'>
                                        <Input />
                                    </FormItem>}
                                {["SCMOH", "SCCHSFP", "SCDSC", "SCHRIO"].includes(whoAreRespondents[index]) &&
                                    <FormItem label="Sub County" control={control} name='subcounty'>
                                        <Input />
                                    </FormItem>}
                                {["CHA", "CHC Member", "CHP"].includes(whoAreRespondents[index]) &&
                                    <FormItem label="CHU Name & MCHUR Code" control={control} name='chu_code'>
                                        <Input />
                                    </FormItem>
                                }
                                {chuCode &&
                                    <FormItem label="Link Facility Name & MFR Code" control={control} name='link_facility_code'>
                                        <Input />
                                    </FormItem>
                                }
                            </>))
                    }
                </>
            }
        </Form >
    );
};

export default SupervisionTeam;