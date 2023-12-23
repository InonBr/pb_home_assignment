import express, { Express } from "express";
import cors from "cors";
import { connectionString, port } from "@config/index";
import userRoutes from "routes/user/user.routes";
import connectDB from "shared-components-npm/src/dBConnection";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);

connectDB(connectionString || "").then(() => {
  console.log("🔵 MongoDB connected...");
  app.listen(port, () => {
    console.log(`🟢 App listening at http://localhost:${port}`);
  });
});
