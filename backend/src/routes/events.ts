import { Router } from "express";

const router = Router();

const mockEvents = [
  {
    id: "1",
    slug: "codefest-2025",
    title: "CodeFest 2025",
    category: "Hackathons",
    date: "2025-11-15",
    participationCount: 220,
  },
];

router.get("/", (_req, res) => {
  res.json({ data: mockEvents, total: mockEvents.length });
});

router.get("/:slug", (req, res) => {
  const event = mockEvents.find((e) => e.slug === req.params.slug);
  if (!event) return res.status(404).json({ error: "Event not found" });
  res.json({ data: event });
});

export default router;
