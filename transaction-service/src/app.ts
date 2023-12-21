import express, { Express } from "express";
import cors from "cors";
import { port } from "@config/index";
import connectDB from "systems/dBConnection";
import transactionHistoryRoutes from "routes/transactionHistory/transactionHistory.routes";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/api/transactionHistory", transactionHistoryRoutes);

connectDB().then(() => {
  console.log("🔵 MongoDB connected...");
  app.listen(port, () => {
    console.log(`🟢 App listening at http://localhost:${port}`);
  });
});
