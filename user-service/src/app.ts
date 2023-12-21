import express, { Express, Request, Response } from "express";
import cors from "cors";
import { port } from "@config";

console.log(port);

const app: Express = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`🟢 App listening at http://localhost:${port}`);
});
