"use client";
import { Form, Input, DatePicker, InputNumber, Row, Col, Select } from "antd";
import { useForm, useFieldArray } from "react-hook-form";
import dayjs from "dayjs";
import { Typography } from "antd";
import { FormItem } from "react-hook-form-antd";
import { useContext, useEffect } from "react";
import CHUFunctionality from "./CHUFunctionality";
import WorkplanPolicies from "./WorkplanPolicies";
import ServiceDelivery from "./ServiceDelivery";
import PandemicPreparedness from "./PandemicPreparedness";
import { AppContext } from "../providers";
import { kenyaCounties, kenyaSubcounties } from "./utils/commonData";

const { Title } = Typography;
const SupervisionTeam = (props) => {
    const disabled = props.disabled || false;
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
        reset(store?.globalState?.superVisionTeam);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        // This runs when the component is mounted or updated
        if (whoAreRespondents !== undefined && whoAreRespondents?.length > 0) {
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
                    "SCMOH",
                    "SCCHSFP",
                    "SCDSC",
                    "SCHRIO",
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [whoAreRespondents]);

    // Watch the "number" input to generate fields dynamically
    const levelOptions = [
        {
            value: "County",
            label: "County",
        },
        {
            value: "Sub-County",
            label: "Sub-County",
        },
        {
            value: "CHU",
            label: "CHU",
        },
    ];
    const respondentoptions = [
        {
            value: "CEC",
            label: "CEC",
            level: "County"
        },
        {
            value: "COH",
            label: "COH",
            level: "County"
        },
        {
            value: "CDH",
            label: "CDH",
            level: "County"
        },
        {
            value: "CCHSFP",
            label: "CCHSFP",
            level: "County"
        },
        {
            value: "CDSC",
            label: "CDSC",
            level: "County"
        },
        {
            value: "CHRIO",
            label: "CHRIO",
            level: "County"
        },
        {
            value: "CPHCC",
            label: "CPHCC",
            level: "County"
        },
        {
            value: "CQIC",
            label: "CQIC",
            level: "County"
        },
        {
            value: "SCMOH",
            label: "SCMOH",
            level: "Sub-County"
        },
        {
            value: "SCCHSFP",
            label: "SCCHSFP",
            level: "Sub-County"
        },
        {
            value: "SCDSC",
            label: "SCDSC",
            level: "Sub-County"
        },
        {
            value: "SCHRIO",
            label: "SCHRIO",
            level: "Sub-County"
        },
        {
            value: "CHA",
            label: "CHA",
            level: "CHU"
        },
        {
            value: "CHC Member",
            label: "CHC Member",
            level: "CHU"
        },
        {
            value: "CHP",
            label: "CHP",
            level: "CHU"
        },
        {
            value: "Others",
            label: "Others",
            level: "All"
        },
    ];
    const durationOptions = [
        {
            value: "<1",
            label: "Less than a year",
        },
        {
            value: "1-3",
            label: "1 to 3 years",
        },
        {
            value: "3>",
            label: "More than 3 years",
        },
    ];

    // Dynamically update field array when the number input changes
    useEffect(() => {
        const currentCount = fields?.length;
        if (numberOfMembers > currentCount) {
            for (let i = currentCount; i < numberOfMembers; i++) {
                append({ name: "", designation: "", organization: "" });
            }
        } else {
            for (let i = currentCount - 1; i >= numberOfMembers; i--) {
                remove(i);
            }
        }
    }, [numberOfMembers, append, remove, fields?.length]);
    return (
        <Form layout="vertical">
            <Title level={3}>Supervision Team</Title>
            <FormItem
                style={{ marginBottom: 10 }}
                required label="How many members are in the supervision team?"
                control={control}
                name="number_in_supervision_team"
                disabled={disabled}
                help="(Team should be between 3-10 people. Exclude the non-technical people)"
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

            {fields?.length > 0 && (
                <>
                    <Title level={5}>
                        Enter the following details of the Supervision Team
                    </Title>

                    {fields?.map((field, index) => (
                        <Row key={index} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col xs={24} sm={24} md={8} lg={8}>
                                <FormItem
                                    disabled={disabled}
                                    required label={`Full Names of member ${index + 1}`}
                                    control={control}
                                    name={`name_member_${index}`}
                                    help={"(Enter 3 names)"}
                                >
                                    <Input
                                        size="large"
                                        placeholder={`Please enter the name of member ${index + 1}`}
                                    />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8}>
                                <FormItem
                                    disabled={disabled}
                                    required label={`Organisation of member ${index + 1}`}
                                    control={control}
                                    name={`organisation_member_${index}`}
                                >
                                    <Input
                                        size="large"
                                        placeholder={`Please enter the Organisation of member ${index + 1
                                            }`}
                                    />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8}>
                                <FormItem
                                    disabled={disabled}
                                    required label={`Designation of member ${index + 1}`}
                                    control={control}
                                    name={`designation_member_${index}`}
                                >
                                    <Input
                                        size="large"
                                        placeholder={`Please enter the Designation of member ${index + 1
                                            }`}
                                    />
                                </FormItem>
                            </Col>
                        </Row>
                    ))}
                </>
            )}
            {fields?.length > 0 &&
                <>
                    <Title level={3}>Supervision Site Details</Title>
                    <FormItem
                        disabled={disabled}
                        required label="Date of Supervision Visit"
                        control={control}
                        name="date"
                    >
                        <DatePicker
                            size="large"
                            style={{ width: "50%" }}
                            format={"DD/MM/YYYY"}
                            minDate={dayjs()}
                            maxDate={dayjs()}
                        />
                    </FormItem></>}
            {fields?.length > 0 && (
                <>
                    <FormItem
                        disabled={disabled}
                        required label="Which level are you supervising?"
                        control={control}
                        name="whichLevelAreYouSupervising"
                    >
                        <Select
                            size={"large"}
                            placeholder="Please select the level you are supervising"
                            style={{ width: "100%" }}
                            options={levelOptions}
                            maxCount={fields?.length}
                        />
                    </FormItem>
                    {watch(`whichLevelAreYouSupervising`) !== undefined &&
                        <FormItem
                            disabled={disabled}
                            required label="Who are your respondents?"
                            control={control}
                            name="whoAreRespondents"
                        >
                            <Select
                                mode="multiple"
                                size={"large"}
                                placeholder="Please select"
                                style={{ width: "100%" }}
                                options={respondentoptions.filter((options) => options.level === watch(`whichLevelAreYouSupervising`) || watch(`whichLevelAreYouSupervising`) !== 'All')}
                                maxCount={fields?.length}
                            />
                        </FormItem>}
                    {watch(`whoAreRespondents`)?.includes('Others') &&
                        <FormItem
                            disabled={disabled}
                            required label="Specify"
                            control={control}
                            name="whoAreRespondentsOthers"
                        >
                            <Input
                                size="large"
                                placeholder={`Please specify your respondents`}
                            />
                        </FormItem>}
                </>
            )}
            {whoAreRespondents?.length > 0 && (
                <>
                    {whoAreRespondents?.map((field: any, index: number) => (
                        <div key={index}>
                            <Title level={5}>{whoAreRespondents[index]}</Title>
                            <FormItem
                                disabled={disabled}
                                required label={`How long have you served in your current position/station?`}
                                control={control}
                                name={`how_long_served_in_position_${whoAreRespondents[index]}`}
                                key={index}
                            >
                                <Select
                                    size={"large"}
                                    placeholder="Please select"
                                    style={{ width: "100%" }}
                                    options={durationOptions}
                                />
                            </FormItem>
                            {[
                                "SCMOH",
                                "SCCHSFP",
                                "SCDSC",
                                "SCHRIO",
                                "CHA",
                                "CHC Member",
                                "CHP",
                            ].includes(whoAreRespondents[index]) || (
                                    <FormItem disabled={disabled} required label="County" control={control} name={`county_${whoAreRespondents[index]}`}>
                                        <Select
                                            size={"large"}
                                            placeholder="Please select county"
                                            style={{ width: "100%" }}
                                            options={kenyaCounties}
                                        />
                                    </FormItem>
                                )}
                            {["SCMOH", "SCCHSFP", "SCDSC", "SCHRIO"].includes(
                                whoAreRespondents[index]
                            ) && (<>
                                <FormItem disabled={disabled} required label="County" control={control} name={`county_${whoAreRespondents[index]}`}>
                                    <Select
                                        size={"large"}
                                        placeholder="Please select county"
                                        style={{ width: "100%" }}
                                        options={kenyaCounties}
                                    />
                                </FormItem>
                                <FormItem disabled={disabled} required label="Sub County" control={control} name={`subcounty_${whoAreRespondents[index]}`}>
                                    <Select
                                        size={"large"}
                                        placeholder="Please select sub county"
                                        style={{ width: "100%" }}
                                        options={kenyaSubcounties[watch(`county_${whoAreRespondents[index]}`)]}
                                    />
                                </FormItem>
                            </>
                                )}
                            {["CHA", "CHC Member", "CHP"].includes(
                                whoAreRespondents[index]
                            ) && (
                                    <FormItem
                                        disabled={disabled}
                                        required label="CHU Name & MCHUR Code"
                                        control={control}
                                        name={`chu_code_${whoAreRespondents[index]}`}
                                    >
                                        <Input
                                            size="large"
                                            placeholder="Please enter CHU Name & MCHUR Code"
                                        />
                                    </FormItem>
                                )}
                            {chuCode && (
                                <FormItem
                                    disabled={disabled}
                                    required label="Link Facility Name & KHMFR Code"
                                    control={control}
                                    name={`link_facility_code_${whoAreRespondents[index]}`}
                                >
                                    <Input
                                        size="large"
                                        placeholder="Please enter Link Facility Name & KHMFR Code"
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
