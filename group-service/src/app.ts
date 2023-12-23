import express, { Express } from "express";
import cors from "cors";
import { port } from "@config/index";
import connectDB from "@systems/dBConnection";

const app: Express = express();

app.use(cors());
app.use(express.json());

connectDB().then(() => {
  console.log("🔵 MongoDB connected...");
  app.listen(port, () => {
    console.log(`🟢 App listening at http://localhost:${port}`);
  });
});
