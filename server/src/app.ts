import express from "express";

const app = express();

app.set("PORT", process.env.PORT || 4040);

export default app;
