"use client";

import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../providers";

import { Form, Radio, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";

const { Title } = Typography;
const { Group: RadioGroup } = Radio;

const Infrastructure = (props) => {
  const disabled = props.disabled || false;
  const store = useContext(AppContext);

  const { control, getValues, reset, watch, handleSubmit } = useForm({});

  useEffect(() => {
    return () => {
      props.setGlobalState((store) => {
        store["Infrastructure"] = getValues();
        return store;
      });
    };
  }, [getValues, props]);

  useEffect(() => {
    reset(store?.globalState?.Infrastructure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Title level={2}>Infrastructure</Title>

      {/* Designated Office */}
      <Form.Item label="Do all your link facilities have office space for community health?" required>
        <RadioGroup
          name="have_designated_office"
          disabled={disabled}
          onChange={(e) => control.setValue("have_designated_office", e.target.value)}
        >
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
        </RadioGroup>
      </Form.Item>

      <Form.Item label="Comment/Remarks" required>
        <TextArea
          rows={3}
          size="large"
          disabled={disabled}
          placeholder="Please enter comments or remarks"
          name="comments_infrastructure_1"
        />
      </Form.Item>

      {/* ICT Infrastructure */}
      <Form.Item label="Do all your CHUs have access to the ICT infrastructure (Desktop/Laptop & Internet)?" required>
        <RadioGroup
          name="has_access_to_ict_infra"
          disabled={disabled}
          onChange={(e) => control.setValue("has_access_to_ict_infra", e.target.value)}
        >
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
        </RadioGroup>
      </Form.Item>

      <Form.Item label="Comment/Remarks" required>
        <TextArea
          rows={3}
          size="large"
          disabled={disabled}
          placeholder="Please enter comments or remarks"
          name="comments_infrastructure_2"
        />
      </Form.Item>

      {/* Inventory Document for CH Office */}
      {watch("have_designated_office") === "yes" && (
        <Form.Item label="Do you have an inventory document for CH office?" required>
          <RadioGroup
            name="have_inventory_document"
            disabled={disabled}
            onChange={(e) => control.setValue("have_inventory_document", e.target.value)}
          >
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </RadioGroup>
        </Form.Item>
      )}

      {/* Up-to-date Inventory of CHS Equipment */}
      <Form.Item label="Do you have an up-to-date inventory of all the CHS equipment? (e.g., CHP kits, Mobile phones, etc.)" required>
        <RadioGroup
          name="upto_date_inventory_chs_equipment"
          disabled={disabled}
          onChange={(e) => control.setValue("upto_date_inventory_chs_equipment", e.target.value)}
        >
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
        </RadioGroup>
      </Form.Item>

      <Form.Item label="Comment">
        <TextArea rows={3} size="large" disabled={disabled} name="comments_infrastructure_3" />
      </Form.Item>

      <button type="submit">Submit</button>
    </Form>
  );
};

export default Infrastructure;
