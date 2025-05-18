import { Router } from "express";
import {
  createCompany,
  getCompanies,
  updateCompany,
  deleteCompany,
} from "./controller";
import { authenticateToken } from "../../middlewares/auth.middleware";

const router = Router();

router.use(authenticateToken);

router.get("/", getCompanies);
router.post("/", createCompany);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);

export default router;
