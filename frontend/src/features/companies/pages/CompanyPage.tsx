import { useState } from "react";
import { Button, Spin } from "antd";

import CompanyTable from "@/features/companies/components/CompanyTable";
import CompanyForm from "@/features/companies/components/CompanyForm";
import type { Company } from "@/types";
import {
  useGetCompanies,
  useCreateCompany,
  useUpdateCompany,
  useDeleteCompany,
} from "@/services/mutations/useCompany";

const CompanyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  const { data: companies, isLoading } = useGetCompanies();
  const createCompany = useCreateCompany();
  const updateCompany = useUpdateCompany();
  const deleteCompany = useDeleteCompany();

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setIsModalOpen(true);
  };

  const handleDelete = (company: Company) => {
    if (company._id) {
      deleteCompany.mutate(company._id);
    }
  };

  const handleSave = (company: Company) => {
    if (editingCompany && company._id) {
      updateCompany.mutate(company);
    } else {
      createCompany.mutate(company);
    }
    setEditingCompany(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add Company
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <CompanyTable
          companies={companies}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}

      <CompanyForm
        open={isModalOpen}
        initialValues={editingCompany}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingCompany(null);
        }}
        onSave={handleSave}
      />
    </div>
  );
};

export default CompanyPage;
