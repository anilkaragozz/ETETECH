import { Request, Response } from "express";
import Product from "./model";

export const createProduct = async (req: Request, res: Response) => {
  const newProduct = await Product.create(req.body);
  res.status(201).json(newProduct);
};

export const getProducts = async (_: Request, res: Response) => {
  const products = await Product.find().populate("companyId", "name");
  res.json(products);
};

export const updateProduct = async (req: Request, res: Response) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

export const deleteProduct = async (req: Request, res: Response) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};
