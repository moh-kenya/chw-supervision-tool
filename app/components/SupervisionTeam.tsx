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
    
    // this array holds all counties
    const counties = [
        { value: "Nairobi", label: "Nairobi" },
        { value: "Mombasa", label: "Mombasa" },
        { value: "Kisumu", label: "Kisumu" },
        
    ];

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
    
    // input to generate fields dynamically
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
            >
                <InputNumber
                    size="large"
                    min={3}
                    max={10}
                    style={{ width: "50%" }}
                    placeholder="Enter number of members in the supervision team"
                />
            </FormItem>

            {fields.length > 0 && (
                <>
                    <Title level={5}>Enter the following details of the Supervision Team</Title>
                    {fields.map((field, index) => (
                        <Row key={index} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col xs={24} sm={24} md={8} lg={8}>
                                <FormItem
                                    required label={`Full Names of member ${index + 1}`}
                                    control={control}
                                    name={`name_member_${index}`}
                                >
                                    <Input size="large" placeholder={`Please enter the name of member ${index + 1}`} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8}>
                                <FormItem
                                    required label={`Organisation of member ${index + 1}`}
                                    control={control}
                                    name={`organisation_member_${index}`}
                                >
                                    <Input size="large" placeholder={`Please enter the Organisation of member ${index + 1}`} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8}>
                                <FormItem
                                    required label={`Designation of member ${index + 1}`}
                                    control={control}
                                    name={`designation_member_${index}`}
                                >
                                    <Input size="large" placeholder={`Please enter the Designation of member ${index + 1}`} />
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
            >
                <DatePicker
                    size="large"
                    style={{ width: "50%" }}
                    format={"DD/MM/YYYY"}
                    minDate={dayjs()}
                    maxDate={dayjs()}
                />
            </FormItem>

            {fields.length > 0 && (
                <FormItem
                    required label="Who are your respondents?"
                    control={control}
                    name="whoAreRespondents"
                >
                    <Select
                        mode="multiple"
                        size={"large"}
                        placeholder="Please select"
                        style={{ width: "100%" }}
                        options={respondentoptions}
                        maxCount={fields.length}
                    />
                </FormItem>
            )}

            {whoAreRespondents?.length > 0 && (
                <>
                    {whoAreRespondents.map((field, index) => (
                        <div key={index}>
                            <Title level={5}>{whoAreRespondents[index]}</Title>
                            <FormItem
                                required label={`How long have you served in your current position/station?`}
                                control={control}
                                name={`how_long_served_in_position_${index}`}
                            >
                                <Select
                                    size={"large"}
                                    placeholder="Please select"
                                    style={{ width: "100%" }}
                                    options={durationOptions}
                                />
                            </FormItem>

                            {/* Add County Dropdown */}
                            <FormItem
                                required label="County"
                                control={control}
                                name={`county_${index}`}
                            >
                                <Select
                                    size="large"
                                    placeholder="Please select a county"
                                    style={{ width: "100%" }}
                                    options={counties}
                                />
                            </FormItem>

                            {/*logic for Sub County */}
                            {["SCMOH", "SCCHSFP", "SCDSC", "SCHRIO"].includes(whoAreRespondents[index]) && (
                                <FormItem
                                    required label="Sub County"
                                    control={control}
                                    name={`subcounty_${index}`}
                                >
                                    <Input size="large" placeholder="Please enter sub-county" />
                                </FormItem>
                            )}

                            {/*logic for CHU */}
                            {["CHA", "CHC Member", "CHP"].includes(whoAreRespondents[index]) && (
                                <FormItem
                                    required label="CHU Name & MCHUR Code"
                                    control={control}
                                    name={`chu_code_${index}`}
                                >
                                    <Input size="large" placeholder="Please enter CHU Name & MCHUR Code" />
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
