import { useState } from "react";
import { Button, Spin } from "antd";
import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";
import type { Product } from "@/types";
import {
  useGetProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "@/services/mutations/useProduct";

const ProductPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { data: products, isLoading } = useGetProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (product: Product) => {
    if (product._id) {
      deleteProduct.mutate(product._id);
    }
  };

  const handleSave = (product: Product) => {
    if (editingProduct && product._id) {
      updateProduct.mutate(product);
    } else {
      createProduct.mutate(product);
    }
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add Product
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <ProductTable
          products={products || []}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}

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
