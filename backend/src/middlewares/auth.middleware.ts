import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized!" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid access token" });
    return;
  }
};
