import express from "express";
import path from 'node:path';
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRouter.js";
import connectDatabase from "./db/connectDatabase.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const __dirname = import.meta.dirname;

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.use(notFoundHandler);
app.use(errorHandler);

await connectDatabase();

app.listen(process.env.PORT, () => {
    console.log("Server is running. Use our API on port: 3000");
});
