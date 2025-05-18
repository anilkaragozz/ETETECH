import { Request, Response } from "express";
import Company from "../company/model";

export const getDashboardStats = async (_req: Request, res: Response) => {
  try {
    const total = await Company.countDocuments();

    const latest = await Company.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .select("name website");

    const grouped = await Company.aggregate([
      {
        $group: {
          _id: "$incorporationCountry",
          count: { $sum: 1 },
        },
      },
    ]);

    const byCountry: Record<string, number> = {};
    grouped.forEach((item) => {
      byCountry[item._id] = item.count;
    });

    res.json({ total, latest, byCountry });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Failed to load dashboard data" });
  }
};
