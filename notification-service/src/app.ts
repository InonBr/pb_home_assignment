import express, { Express, Request, Response } from "express";
import cors from "cors";
import { port } from "./config";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.post(
  "/api/notification/sendNotification",
  (_req: Request, res: Response) => {
    console.log("some clever notification logic...");

    return res.status(200).json({
      msg: "done",
    });
  }
);

app.listen(port, () => {
  console.log(`🟢 App listening at http://localhost:${port}`);
});
