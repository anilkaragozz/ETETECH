import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  category: string;
  amount: number;
  unit: string;
  companyId: mongoose.Types.ObjectId;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    unit: { type: String, required: true },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
