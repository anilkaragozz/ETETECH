import { Table, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { Company } from "@/types";

type Props = {
  companies?: Company[];
  onDelete: (company: Company) => void;
  onEdit: (company: Company) => void;
};

const CompanyTable = ({ companies, onDelete, onEdit }: Props) => {
  const columns = [
    {
      title: "Company Name",
      dataIndex: "name",
    },
    {
      title: "Company Legal Number",
      dataIndex: "legalNumber",
    },
    {
      title: "Incorporation Country",
      dataIndex: "country",
    },
    {
      title: "Website",
      dataIndex: "website",
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "İşlemler",
      render: (record: Company) => (
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
      dataSource={companies}
      rowKey="id"
      pagination={false}
    />
  );
};

export default CompanyTable;
