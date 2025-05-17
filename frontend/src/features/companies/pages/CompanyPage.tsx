import { useState } from "react";
import { Button } from "antd";
import CompanyTable from "../components/CompanyTable";
import CompanyForm from "../components/CompanyForm";

export type Company = {
  id: string;
  name: string;
  legalNumber: string;
  country: string;
  website: string;
};

const CompanyPage = () => {
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: "1",
      name: "Alpha Corp",
      legalNumber: "1234567890",
      country: "USA",
      website: "https://alpha.com",
    },
    {
      id: "2",
      name: "Beta Ltd",
      legalNumber: "2345678901",
      country: "UK",
      website: "https://beta.co.uk",
    },
    {
      id: "3",
      name: "Gamma GmbH",
      legalNumber: "3456789012",
      country: "Germany",
      website: "https://gamma.de",
    },
    {
      id: "4",
      name: "Delta SA",
      legalNumber: "4567890123",
      country: "France",
      website: "https://delta.fr",
    },
    {
      id: "5",
      name: "Epsilon AB",
      legalNumber: "5678901234",
      country: "Sweden",
      website: "https://epsilon.se",
    },
    {
      id: "6",
      name: "Zeta SpA",
      legalNumber: "6789012345",
      country: "Italy",
      website: "https://zeta.it",
    },
    {
      id: "7",
      name: "Eta AS",
      legalNumber: "7890123456",
      country: "Norway",
      website: "https://eta.no",
    },
    {
      id: "8",
      name: "Theta OY",
      legalNumber: "8901234567",
      country: "Finland",
      website: "https://theta.fi",
    },
    {
      id: "9",
      name: "Iota BV",
      legalNumber: "9012345678",
      country: "Netherlands",
      website: "https://iota.nl",
    },
    {
      id: "10",
      name: "Kappa KK",
      legalNumber: "0123456789",
      country: "Japan",
      website: "https://kappa.jp",
    },
    {
      id: "11",
      name: "Lambda Pty",
      legalNumber: "1123456789",
      country: "Australia",
      website: "https://lambda.au",
    },
    {
      id: "12",
      name: "Mu Inc",
      legalNumber: "1223456789",
      country: "Canada",
      website: "https://mu.ca",
    },
    {
      id: "13",
      name: "Nu SARL",
      legalNumber: "1323456789",
      country: "Switzerland",
      website: "https://nu.ch",
    },
    {
      id: "14",
      name: "Xi Co",
      legalNumber: "1423456789",
      country: "Ireland",
      website: "https://xi.ie",
    },
    {
      id: "15",
      name: "Omicron SA",
      legalNumber: "1523456789",
      country: "Portugal",
      website: "https://omicron.pt",
    },
    {
      id: "16",
      name: "Pi NV",
      legalNumber: "1623456789",
      country: "Belgium",
      website: "https://pi.be",
    },
    {
      id: "17",
      name: "Rho LLC",
      legalNumber: "1723456789",
      country: "USA",
      website: "https://rho.us",
    },
    {
      id: "18",
      name: "Sigma Ltd",
      legalNumber: "1823456789",
      country: "UK",
      website: "https://sigma.co.uk",
    },
    {
      id: "19",
      name: "Tau GmbH",
      legalNumber: "1923456789",
      country: "Germany",
      website: "https://tau.de",
    },
    {
      id: "20",
      name: "Upsilon AS",
      legalNumber: "2023456789",
      country: "Norway",
      website: "https://upsilon.no",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setIsModalOpen(true);
  };

  const handleDelete = (company: Company) => {
    setCompanies((prev) => prev.filter((c) => c.id !== company.id));
  };

  const handleSave = (company: Company) => {
    if (editingCompany) {
      setCompanies((prev) =>
        prev.map((c) => (c.id === company.id ? company : c))
      );
    } else {
      setCompanies((prev) => [...prev, company]);
    }
    setEditingCompany(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Yeni Şirket Ekle
        </Button>
      </div>

      <CompanyTable
        companies={companies}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

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
