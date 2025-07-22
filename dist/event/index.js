"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRouter = void 0;
const express_1 = require("express");
const categoriesEvent_1 = require("../utils/categoriesEvent");
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
const events = [];
// Route to create a new event
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, date, time, notes } = req.body;
    if (!title || !date || !time) {
        return res
            .status(400)
            .json({ message: "Title, date, and time are required." });
    }
    const category = (0, categoriesEvent_1.categorizeEvent)(title, notes);
    const newEvent = {
        id: (0, uuid_1.v4)(),
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
}));
router.get("/", (req, res) => {
    const sortedEvents = events.sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() -
        new Date(`${b.date}T${b.time}`).getTime());
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
exports.eventRouter = router;
