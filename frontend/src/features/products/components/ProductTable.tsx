import { Table, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { Product } from "../pages/ProductPage";

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
      title: "SKU",
      dataIndex: "sku",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Stock",
      dataIndex: "stock",
    },
    {
      title: "İşlemler",
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
      rowKey="id"
      pagination={false}
    />
  );
};

export default ProductTable;
