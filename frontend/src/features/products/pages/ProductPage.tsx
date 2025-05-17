import { useState } from "react";
import { Button } from "antd";
import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";

export type Product = {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
};

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (product: Product) => {
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
  };

  const handleSave = (product: Product) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? product : p))
      );
    } else {
      setProducts((prev) => [...prev, product]);
    }
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Yeni Ürün Ekle
        </Button>
      </div>

      <ProductTable
        products={products}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <ProductForm
        open={isModalOpen}
        initialValues={editingProduct}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSave}
      />
    </div>
  );
};

export default ProductPage;
