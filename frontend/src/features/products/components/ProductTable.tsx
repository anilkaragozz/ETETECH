import { Table, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { Product } from "@/types";

type Props = {
  products: Product[];
  onDelete: (product: Product) => void;
  onEdit: (product: Product) => void;
};

const ProductTable = ({ products, onDelete, onEdit }: Props) => {
  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Unit",
      dataIndex: "unit",
    },
    {
      title: "Company Name",
      dataIndex: ["companyId", "name"], // nested path
      render: (text: string) => text || "-",
    },
    {
      title: "Actions",
      render: (record: Product) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            type="link"
            onClick={() => onEdit(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            type="link"
            danger
            onClick={() => onDelete(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={products}
      rowKey={"_id"}
      pagination={{ pageSize: 10 }}
      scroll={{ x: 800 }}
    />
  );
};

export default ProductTable;
