import express, { Express } from "express";
import cors from "cors";
import { port } from "@config";
import connectDB from "@systems/dBConnection";
import userRoutes from "routes/user/user.routes";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);

connectDB().then(() => {
  console.log("🔵 MongoDB connected...");
  app.listen(port, () => {
    console.log(`🟢 App listening at http://localhost:${port}`);
  });
});
