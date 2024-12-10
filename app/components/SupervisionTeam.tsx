"use client";
import { Form, Input, DatePicker, InputNumber, Row, Col, Select } from "antd";
import { useForm, useFieldArray } from "react-hook-form";
import dayjs from "dayjs";
import { Typography } from "antd";
import { FormItem } from "react-hook-form-antd";
import { useContext, useEffect } from "react";
import { AppContext } from "../new-supervision/page";
import CHUFunctionality from "./CHUFunctionality";
import WorkplanPolicies from "./WorkplanPolicies";
import ServiceDelivery from "./ServiceDelivery";
import PandemicPreparedness from "./PandemicPreparedness";

const { Title } = Typography;

const SupervisionTeam = (props) => {
    const store = useContext(AppContext);

    const { control, watch, getValues, reset } = useForm({});
    const { fields, append, remove } = useFieldArray({
        control,
        name: "teamMembers", // name for the array
    });
    const numberOfMembers = watch("number_in_supervision_team", 0);
    const whoAreRespondents = watch("whoAreRespondents");
    const chuCode = watch("chu_code");

    useEffect(() => {
        return () => {
            props.setGlobalState((store) => {
                store["superVisionTeam"] = getValues();
                return store;
            });
        };
    }, [getValues, props]);

    useEffect(() => {
        reset(store.globalState.superVisionTeam);
    }, []);

    useEffect(() => {
        // This runs when the component is mounted or updated
        if (whoAreRespondents !== undefined && whoAreRespondents.length > 0) {
            let modules = store?.modules || [];
            if (
                ![
                    "CEC",
                    "COH",
                    "CDH",
                    "CCHSFP",
                    "CDSC",
                    "CHRIO",
                    "CPHCC",
                    "CQIC",
                ].some((value) => whoAreRespondents?.includes(value))
            ) {
                modules = modules.filter(
                    (item: { title: string }) =>
                        item.title !== "Leadership & Governance" &&
                        item.title !== "Service Delivery" &&
                        item.title != "Pandemic Preparedness"
                );
            } else {
                const isPresent = modules.some(
                    (existingItem) => existingItem.title === "Leadership & Governance"
                );
                if (!isPresent) {
                    const leadershipItem = {
                        title: "Leadership & Governance",
                        content: <CHUFunctionality setGlobalState={props.setGlobalState} />,
                    };
                    const serviceDelivery = {
                        title: "Service Delivery",
                        content: <ServiceDelivery setGlobalState={props.setGlobalState} />,
                    };
                    const pandemicPreparedness = {
                        title: "Pandemic Preparedness",
                        content: (
                            <PandemicPreparedness setGlobalState={props.setGlobalState} />
                        ),
                    };

                    modules.splice(0, 0, leadershipItem);
                    modules.splice(9, 0, serviceDelivery);
                    modules.splice(10, 0, pandemicPreparedness);
                }
            }
            if (
                !["CEC", "COH", "CDH", "CCHSFP", "CDSC", "CHRIO", "CPHCC", "CQIC"].some(
                    (value) => whoAreRespondents?.includes(value)
                )
            ) {
                modules = modules.filter(
                    (item: { title: string }) => item.title !== "Workforce"
                );
            } else {
                const isPresent = modules.some(
                    (existingItem) => existingItem.title === "Workforce"
                );
                if (!isPresent) {
                    const workForceItem = {
                        title: "Workforce",
                        content: <WorkplanPolicies setGlobalState={props.setGlobalState} />,
                    };

                    modules.splice(0, 1, workForceItem);
                }
            }
            store?.setModules(modules);
        }
    }, [whoAreRespondents]);

    //  input to generate fields dynamically
    const respondentoptions = [
        { value: "CEC", label: "CEC" },
        { value: "COH", label: "COH" },
        { value: "CDH", label: "CDH" },
        { value: "CCHSFP", label: "CCHSFP" },
        { value: "CDSC", label: "CDSC" },
        { value: "CHRIO", label: "CHRIO" },
        { value: "CPHCC", label: "CPHCC" },
        { value: "CQIC", label: "CQIC" },
        { value: "SCMOH", label: "SCMOH" },
        { value: "SCCHSFP", label: "SCCHSFP" },
        { value: "SCDSC", label: "SCDSC" },
        { value: "SCHRIO", label: "SCHRIO" },
        { value: "CHA", label: "CHA" },
        { value: "CHC Member", label: "CHC Member" },
        { value: "CHP", label: "CHP" },
    ];

    const durationOptions = [
        { value: "<1", label: "Less than a year" },
        { value: "1-3", label: "1 to 3 years" },
        { value: "3>", label: "More than 3 years" },
    ];

    const counties = [
        "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Machakos", 
        "Nyeri", "Meru", "Kilifi", "Kwale", "Kirinyaga", "Migori", 
        "Siaya", "Bungoma", "Kakamega", "Busia", "Homabay", "Turkana",
        "Garissa", "Mandera", "Isiolo", "Kitui", "Embu", "Tharaka Nithi",
        "Narok", "Kajiado", "Uasin Gishu", "Trans Nzoia", "Vihiga", "Nandi"
    ];

    // Dynamically update field array when the number input changes
    useEffect(() => {
        const currentCount = fields.length;
        if (numberOfMembers > currentCount) {
            for (let i = currentCount; i < numberOfMembers; i++) {
                append({ name: "", designation: "", organization: "" });
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
                required label="Number of members in the supervision team"
                control={control}
                name="number_in_supervision_team"
                required
            >
                <InputNumber
                    size="large"
                    min={3}
                    max={10}
                    required={true}
                    style={{ width: "50%" }}
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
                                    required label={`Full Names of member ${index + 1}`}
                                    control={control}
                                    name={`name_member_${index}`}
                                    required
                                >
                                    <Input
                                        size="large"
                                        placeholder={`Please enter the name of member ${index + 1}`}
                                    />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8}>
                                <FormItem
                                    required label={`Organisation of member ${index + 1}`}
                                    control={control}
                                    name={`organisation_member_${index}`}
                                    required
                                >
                                    <Input
                                        size="large"
                                        placeholder={`Please enter the Organisation of member ${index + 1}`}
                                    />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8}>
                                <FormItem
                                    required label={`Designation of member ${index + 1}`}
                                    control={control}
                                    name={`designation_member_${index}`}
                                    required
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
                required label="Date of Supervision Visit"
                control={control}
                name="date"
                required
            >
                <DatePicker
                    size="large"
                    style={{ width: "50%" }}
                    format={"DD/MM/YYYY"}
                    minDate={dayjs()}
                    maxDate={dayjs()}
                />
            </FormItem>

            {fields?.length > 0 && (
                <FormItem
                    required label="Who are the respondents?"
                    control={control}
                    name="whoAreRespondents"
                    required
                >
                    <Select
                        mode="multiple"
                        options={respondentoptions}
                        style={{ width: "100%" }}
                        placeholder="Select respondents"
                    />
                </FormItem>
            )}

            <FormItem required label="County" control={control} name="county">
                <Select size="large" placeholder="Select a county">
                    {counties.map((county) => (
                        <Select.Option key={county} value={county}>
                            {county}
                        </Select.Option>
                    ))}
                </Select>
            </FormItem>
        </Form>
    );
};

export default SupervisionTeam;
