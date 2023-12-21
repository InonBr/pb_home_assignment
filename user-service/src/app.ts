import express, { Express, Request, Response } from "express";
import cors from "cors";
import { port } from "@config";
import connectDB from "@systems/dBConnection";

console.log(port);

const app: Express = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

connectDB().then(() => {
  console.log("🔵 MongoDB connected...");
  app.listen(port, () => {
    console.log(`🟢 App listening at http://localhost:${port}`);
  });
});
