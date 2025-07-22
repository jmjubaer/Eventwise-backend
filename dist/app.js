"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const event_1 = require("./event");
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//  event routes
app.use("/events", event_1.eventRouter);
app.get("/", (_req, res) => {
    res.send("Welcome to Eventwise Backend!");
});
// Catch-all route
app.use((_req, res) => {
    res.status(404).json({ message: "Route not found" });
});
app.listen(config_1.default.port, () => {
    console.log(`Server is running on port ${config_1.default.port}`);
});
