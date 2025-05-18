import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db";
import authRoutes from "./features/auth/routes";
import companyRoutes from "./features/company/routes";
import productRoutes from "./features/product/routes";
import dashboardRoutes from "./features/dashboard/routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/products", productRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server works on http://localhost:${PORT} `);
});
