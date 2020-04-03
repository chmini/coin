import express from "express";

const app = express();

app.get("/", (req, res) => res.send("HOME"));

export default app;
