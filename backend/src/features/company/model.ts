import mongoose, { Schema, Document } from "mongoose";

export interface ICompany extends Document {
  name: string;
  legalNumber: string;
  incorporationCountry: string;
  website: string;
}

const CompanySchema = new Schema<ICompany>(
  {
    name: { type: String, required: true },
    legalNumber: { type: String, required: true },
    incorporationCountry: { type: String, required: true },
    website: { type: String, required: true },
  },
  { timestamps: true }
);

const Company = mongoose.model<ICompany>("Company", CompanySchema);
export default Company;
