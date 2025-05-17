import { Modal, Form, Input, Button } from "antd";
import { useEffect } from "react";
import type { Company } from "@/types";

type Props = {
  open: boolean;
  onCancel: () => void;
  onSave: (company: Company) => void;
  initialValues?: Company | null;
};

const CompanyFormModal = ({ open, onCancel, onSave, initialValues }: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const onFinish = (values: Omit<Company, "id">) => {
    const company: Company = {
      id: initialValues?.id || crypto.randomUUID(),
      ...values,
    };
    onSave(company);
    form.resetFields();
  };

  return (
    <Modal
      title={initialValues ? "Şirketi Düzenle" : "Yeni Şirket Ekle"}
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
          label="Şirket Adı"
          name="name"
          rules={[{ required: true, message: "Şirket adı gereklidir" }]}
        >
          <Input placeholder="Şirket adı" />
        </Form.Item>

        <Form.Item
          label="Vergi Numarası"
          name="legalNumber"
          rules={[{ required: true, message: "Vergi numarası gereklidir" }]}
        >
          <Input placeholder="Vergi numarası" />
        </Form.Item>

        <Form.Item
          label="Ülke"
          name="country"
          rules={[{ required: true, message: "Ülke gereklidir" }]}
        >
          <Input placeholder="Ülke" />
        </Form.Item>

        <Form.Item
          label="Website"
          name="website"
          rules={[
            { required: true, message: "Website gereklidir" },
            { type: "url", message: "Geçerli bir URL girin" },
          ]}
        >
          <Input placeholder="https://example.com" />
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

export default CompanyFormModal;
