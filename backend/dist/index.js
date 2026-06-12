"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const events_1 = __importDefault(require("./routes/events"));
const team_1 = __importDefault(require("./routes/team"));
const projects_1 = __importDefault(require("./routes/projects"));
const gallery_1 = __importDefault(require("./routes/gallery"));
const applications_1 = __importDefault(require("./routes/applications"));
const contact_1 = __importDefault(require("./routes/contact"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json({ limit: "10mb" }));
app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", chapter: "NMIMS Indore ACM Student Chapter" });
});
app.use("/api/events", events_1.default);
app.use("/api/team", team_1.default);
app.use("/api/projects", projects_1.default);
app.use("/api/gallery", gallery_1.default);
app.use("/api/applications", applications_1.default);
app.use("/api/contact", contact_1.default);
app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
});
app.listen(PORT, () => {
    console.log(`ACM API running on port ${PORT}`);
});
