import express from "express";
import cors from "cors";
import { eventRouter } from "./event";

const app = express();

app.use(express.json());
app.use(cors());

//  event routes
app.use("/events", eventRouter);

app.get("/", (_req, res) => {
    res.send("Welcome to Eventwise Backend!");
});

// Catch-all route
app.use((_req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
