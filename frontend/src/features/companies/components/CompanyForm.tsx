import { Modal, Form, Input, Button, Select } from "antd";
import { useEffect } from "react";
import type { Company } from "@/types";
import countries from "@/data/countries.json";

type Props = {
  open: boolean;
  onCancel: () => void;
  onSave: (company: Company) => void;
  initialValues?: Company | null;
};

const CompanyForm = ({ open, onCancel, onSave, initialValues }: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const onFinish = (values: Omit<Company, "_id">) => {
    const company: Company = {
      ...initialValues,
      ...values,
    };
    onSave(company);
    form.resetFields();
  };

  return (
    <Modal
      title={initialValues ? "Edit Company" : "Add Company"}
      open={open}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        className="space-y-6"
      >
        <Form.Item
          label="Company Name"
          name="name"
          rules={[{ required: true, message: "Company Name is required!" }]}
        >
          <Input placeholder="Company Name" />
        </Form.Item>

        <Form.Item
          label="Legal Number"
          name="legalNumber"
          rules={[{ required: true, message: "Legal Number is required!" }]}
        >
          <Input placeholder="Legal Number" />
        </Form.Item>

        <Form.Item
          label="Country"
          name="incorporationCountry"
          rules={[{ required: true, message: "Country is required!" }]}
        >
          <Select
            showSearch
            placeholder="Choose a country"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.children as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {countries.map((country) => (
              <Select.Option key={country.code} value={country.name}>
                {country.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Website"
          name="website"
          rules={[
            { required: true, message: "Website is required!" },
            { type: "url", message: "Please enter valid URL" },
          ]}
        >
          <Input placeholder="https://example.com" />
        </Form.Item>

        <Form.Item className="text-right">
          <Button onClick={onCancel} className="mr-4">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            {initialValues ? "Edit" : "Save"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CompanyForm;
