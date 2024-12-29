import React, { useState, useEffect, useContext } from "react";
import { Form, Input, DatePicker, InputNumber, Row, Col, Select, Typography } from "antd";
import { useForm, useFieldArray } from "react-hook-form";
import dayjs from "dayjs";
import { AppContext } from "../providers"; // Updated to match correct import path
import CHUFunctionality from "./CHUFunctionality";
import WorkplanPolicies from "./WorkplanPolicies";
import ServiceDelivery from "./ServiceDelivery";
import PandemicPreparedness from "./PandemicPreparedness";
import { counties, subCounties } from "./utils/commonData"; // Importing counties and sub-counties data

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

  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedSubCounties, setSelectedSubCounties] = useState<{ value: string, label: string }[]>([]);

  useEffect(() => {
    // Set global state for supervision team when the form data changes
    return () => {
      props.setGlobalState((store) => {
        store["superVisionTeam"] = getValues();
        return store;
      });
    };
  }, [getValues, props]);

  useEffect(() => {
    reset(store?.globalState?.superVisionTeam);
  }, [store?.globalState?.superVisionTeam, reset]);

  useEffect(() => {
    // Run this when 'whoAreRespondents' changes to adjust available modules
    if (whoAreRespondents !== undefined && whoAreRespondents.length > 0) {
      let modules = store?.modules || [];
      const excludedRoles = [
        "CEC", "COH", "CDH", "CCHSFP", "CDSC", "CHRIO", "CPHCC", 
        "CQIC", "SCMOH", "SCCHSFP", "SCDSC", "SCHRIO"
      ];

      if (!whoAreRespondents.some(role => excludedRoles.includes(role))) {
        modules = modules.filter(
          (item: { title: string }) =>
            !["Leadership & Governance", "Service Delivery", "Pandemic Preparedness"].includes(item.title)
        );
      } else {
        if (!modules.some((existingItem) => existingItem.title === "Leadership & Governance")) {
          modules.push({
            title: "Leadership & Governance",
            content: <CHUFunctionality setGlobalState={props.setGlobalState} />,
          });
        }
        modules.push(
          {
            title: "Service Delivery",
            content: <ServiceDelivery setGlobalState={props.setGlobalState} />,
          },
          {
            title: "Pandemic Preparedness",
            content: <PandemicPreparedness setGlobalState={props.setGlobalState} />,
          }
        );
      }
    }
  }, [whoAreRespondents, store?.modules, props.setGlobalState]);

  return (
    <div>
      <Title level={2}>Supervision Team</Title>
      {/* Additional form fields */}
    </div>
  );
};

export default SupervisionTeam;


<<<<<<< HEAD

  // Function to get subcounties for a given county
const getSubCounties = (county) => {
  return subCounties[county] || []; // Return the subcounties or an empty array if the county doesn't exist
};




const handleCountyChange = (selectedValue: string) => {
  setSelectedCounty(selectedValue);
  const mySubcounties = getSubCounties(selectedValue);
  setSelectedSubCounties(mySubcounties); // Ensure this contains an array of { value, label } objects
};



  console.log(selectedCounty)

  console.log(selectedSubCounties)

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
  }, [store.globalState.superVisionTeam]);

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
        required
        label="Number of members in the supervision team"
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
                  required
                  label={`Full Names of member ${index + 1}`}
                  control={control}
                  name={`name_member_${index}`}
                >
                  <Input size="large" placeholder={`Please enter the name of member ${index + 1}`} />
                </FormItem>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <FormItem
                  required
                  label={`Organisation of member ${index + 1}`}
                  control={control}
                  name={`organisation_member_${index}`}
                >
                  <Input size="large" placeholder={`Please enter the Organisation of member ${index + 1}`} />
                </FormItem>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <FormItem
                  required
                  label={`Designation of member ${index + 1}`}
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
      <FormItem required label="Date of Supervision Visit" control={control} name="date">
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
          required
          label="Who are your respondents?"
          control={control}
          name="whoAreRespondents"
        >
          <Select
            mode="multiple"
            size={"large"}
            placeholder="Please select"
            style={{ width: "100%" }}
            options={[
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
            ]}
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
                required
                label={`How long have you served in your current position/station?`}
                control={control}
                name={`how_long_served_in_position_${index}`}
              >
                <Select
                  size={"large"}
                  placeholder="Please select"
                  style={{ width: "100%" }}
                  options={[
                    { value: "<1", label: "Less than a year" },
                    { value: "1-3", label: "1 to 3 years" },
                    { value: "3>", label: "More than 3 years" },
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
                  style={{ width: "100%" }}
                  options={counties}
                  onChange={handleCountyChange}
                />
              </FormItem>

              {/* Sub-County Dropdown */}
              {selectedCounty && (
  <FormItem
    required
    label="Sub County"
    control={control}
    name={`subcounty_${index}`}
  >
    <Select
      size="large"
      placeholder="Please select a sub-county"
      style={{ width: "100%" }}
      options={selectedSubCounties} // This must be an array of { value, label } objects
    />
  </FormItem>
)}


              {/* Add more form items for other respondents if needed */}
            </div>
          ))}
        </>
      )}
    </Form>
  );
=======
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
>>>>>>> origin/main
};



export default SupervisionTeam;
