"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
const contactSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    email: zod_1.z.string().email(),
    subject: zod_1.z.string().min(3),
    message: zod_1.z.string().min(10),
});
router.post("/", (req, res) => {
    const result = contactSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: result.error.flatten() });
    }
    res.status(201).json({ message: "Message sent successfully" });
});
exports.default = router;
