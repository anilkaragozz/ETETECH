import { Modal, Form, Input, InputNumber, Button } from "antd";
import { useEffect } from "react";
import type { Product } from "../pages/ProductPage";

type Props = {
  open: boolean;
  onCancel: () => void;
  onSave: (product: Product) => void;
  initialValues?: Product | null;
};

const ProductForm = ({ open, onCancel, onSave, initialValues }: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const onFinish = (values: Omit<Product, "id">) => {
    const product: Product = {
      id: initialValues?.id || crypto.randomUUID(),
      ...values,
    };
    onSave(product);
    form.resetFields();
  };

  return (
    <Modal
      title={initialValues ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
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
          label="Ürün Adı"
          name="name"
          rules={[{ required: true, message: "Ürün adı gereklidir" }]}
        >
          <Input placeholder="Ürün adı" />
        </Form.Item>

        <Form.Item
          label="SKU"
          name="sku"
          rules={[{ required: true, message: "SKU gereklidir" }]}
        >
          <Input placeholder="Stok kodu" />
        </Form.Item>

        <Form.Item
          label="Fiyat"
          name="price"
          rules={[{ required: true, message: "Fiyat gereklidir" }]}
        >
          <InputNumber
            placeholder="Fiyat"
            min={0}
            step={0.01}
            className="w-full"
          />
        </Form.Item>

        <Form.Item
          label="Stok"
          name="stock"
          rules={[{ required: true, message: "Stok miktarı gereklidir" }]}
        >
          <InputNumber placeholder="Stok" min={0} step={1} className="w-full" />
        </Form.Item>

        <Form.Item className="text-right">
          <Button onClick={onCancel} className="mr-2">
            Vazgeç
          </Button>
          <Button type="primary" htmlType="submit">
            {initialValues ? "Güncelle" : "Kaydet"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductForm;
