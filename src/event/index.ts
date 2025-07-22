import { Router } from "express";
import { categorizeEvent } from "../utils/categoriesEvent";
import { v4 as uuidv4 } from "uuid";
import { TEvent } from "../types";

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

export const eventRouter = router;
