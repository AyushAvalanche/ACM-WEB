import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ data: [], message: "Connect PostgreSQL to load projects" });
});

export default router;
