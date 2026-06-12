import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import eventsRouter from "./routes/events";
import teamRouter from "./routes/team";
import projectsRouter from "./routes/projects";
import galleryRouter from "./routes/gallery";
import applicationsRouter from "./routes/applications";
import contactRouter from "./routes/contact";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", chapter: "NMIMS Indore ACM Student Chapter" });
});

app.use("/api/events", eventsRouter);
app.use("/api/team", teamRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/gallery", galleryRouter);
app.use("/api/applications", applicationsRouter);
app.use("/api/contact", contactRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`ACM API running on port ${PORT}`);
});
