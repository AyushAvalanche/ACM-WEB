"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
const applicationSchema = zod_1.z.object({
    type: zod_1.z.enum(["membership", "volunteer", "recruitment"]).default("membership"),
    fullName: zod_1.z.string().min(2),
    email: zod_1.z.string().email(),
    studentId: zod_1.z.string().optional(),
    branch: zod_1.z.string().optional(),
    yearOfStudy: zod_1.z.string().optional(),
    motivation: zod_1.z.string().min(10),
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
exports.default = router;
