import { Router } from "express";
import { z } from "zod";

const router = Router();

const applicationSchema = z.object({
  type: z.enum(["membership", "volunteer", "recruitment"]).default("membership"),
  fullName: z.string().min(2),
  email: z.string().email(),
  studentId: z.string().optional(),
  branch: z.string().optional(),
  yearOfStudy: z.string().optional(),
  motivation: z.string().min(10),
});

router.post("/", (req, res) => {
  const result = applicationSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.flatten() });
  }
  res.status(201).json({
    message: "Application received",
    data: { id: crypto.randomUUID(), status: "pending" },
  });
});

export default router;
