import { Modal, Form, Input, InputNumber, Button, Select } from "antd";
import { useEffect } from "react";
import type { Product } from "@/types";
import { useGetCompanies } from "@/services/mutations/useCompany";

type Props = {
  open: boolean;
  onCancel: () => void;
  onSave: (product: Product) => void;
  initialValues?: Product | null;
};

const ProductForm = ({ open, onCancel, onSave, initialValues }: Props) => {
  const [form] = Form.useForm();
  const { data: companies, isLoading: loadingCompanies } = useGetCompanies();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const onFinish = (values: Omit<Product, "_id">) => {
    const product: Product = {
      ...initialValues,
      ...values,
    };
    onSave(product);
    form.resetFields();
  };

  return (
    <Modal
      title={initialValues ? "Edit Product" : "Add Product"}
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
          label="Company"
          name="companyId"
          rules={[{ required: true, message: "Company is required!" }]}
        >
          <Select
            placeholder="Select a company"
            loading={loadingCompanies}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.children as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {companies?.map((company) => (
              <Select.Option key={company._id} value={company._id}>
                {company.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Product name is required!" }]}
        >
          <Input placeholder="Product Name" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Category is required!" }]}
        >
          <Input placeholder="Category" />
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: "Amount is required!" }]}
        >
          <InputNumber
            min={0}
            step={1}
            className="w-full"
            placeholder="Amount"
          />
        </Form.Item>

        <Form.Item
          label="Unit"
          name="unit"
          rules={[{ required: true, message: "Unit is required!" }]}
        >
          <InputNumber min={0} step={1} className="w-full" placeholder="Unit" />
        </Form.Item>

        <Form.Item className="text-right">
          <Button onClick={onCancel} className="mr-2">
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

export default ProductForm;
