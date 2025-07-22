import { Router } from "express";
import { categorizeEvent } from "../utils/categoriesEvent";
import { v4 as uuidv4 } from "uuid";
import { TEvent } from "../types";
import { format } from "date-fns";
const router = Router();
const events: TEvent[] = [];

// Route to create a new event
router.post("/create", async (req, res) => {
    const { title, date, time, notes } = req.body;
    if (!title || !date || !time) {
        return res
            .status(400)
            .json({ message: "Title, date, and time are required." });
    }

    const category = categorizeEvent(title, notes);
    const newEvent = {
        id: uuidv4(),
        title,
        date,
        time,
        notes,
        archived: false,
        category,
    };

    events.push(newEvent);
    res.status(201).send({
        message: "Event created successfully",
        event: newEvent,
    });
});

router.get("/", (req, res) => {
    const sortedEvents = events.sort(
        (a, b) =>
            new Date(`${a.date}T${a.time}`).getTime() -
            new Date(`${b.date}T${b.time}`).getTime()
    );
    res.json({
        message: "Events retrieved successfully",
        events: sortedEvents,
    });
});

router.get("/:id", (req, res) => {
    const event = events.find((e) => e.id === req.params.id);
    if (!event) {
        return res.status(404).json({ message: "Event not found" });
    }
    res.json({
        message: "Event retrieved successfully",
        event,
    });
});

router.put("/archived/:id", (req, res) => {
    const { id } = req.params;
    const event = events.find((e) => e.id === id);

    if (!event) {
        return res.status(404).json({ message: "Event not found." });
    }

    event.archived = true;
    res.json(event);
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const index = events.findIndex((e) => e.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Event not found." });
    }

    events.splice(index, 1);

    res.status(204).send({
        message: "Event deleted successfully",
        eventId: id,
    });
});

router.get("/stats/event", (_req, res) => {
    const today = format(new Date(), "yyyy-MM-dd");

    const totalEvents = events.length;
    const todayEvents = events.filter((e) => e.date === today).length;
    const archivedEvents = events.filter((e) => e.archived).length;

    const categoryCounts = {
        Work: events.filter((e) => e.category === "Work").length,
        Personal: events.filter((e) => e.category === "Personal").length,
        Other: events.filter((e) => e.category === "Other").length,
    };

    res.json({
        totalEvents,
        todayEvents,
        archivedEvents,
        categoryCounts,
    });
});

export const eventRouter = router;
