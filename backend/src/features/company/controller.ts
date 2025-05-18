import { Request, Response } from "express";
import Company from "./model";

export const createCompany = async (req: Request, res: Response) => {
  const newCompany = await Company.create(req.body);
  res.status(201).json(newCompany);
};

export const getCompanies = async (_: Request, res: Response) => {
  const companies = await Company.find();
  res.json(companies);
};

export const updateCompany = async (req: Request, res: Response) => {
  const updated = await Company.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

export const deleteCompany = async (req: Request, res: Response) => {
  await Company.findByIdAndDelete(req.params.id);
  res.json({ message: "Company deleted." });
};
