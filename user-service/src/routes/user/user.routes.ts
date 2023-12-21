import { validateSchema } from "@systems/middleware/validateSchema.middleware";
import { Request, Response, Router } from "express";
import {
  CreateNewUserSchema,
  CreateNewUserSchemaType,
} from "./userRouts.schema";

const userRoutes = Router();

userRoutes.post(
  "/createNewUser",
  validateSchema(CreateNewUserSchema),
  async (req: Request<{}, {}, CreateNewUserSchemaType>, res: Response) => {
    try {
      const { email, firstName, lastName } = req.body;

      return res.status(201).json({
        msg: "user successfully created",
        email,
        firstName,
        lastName,
      });
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        msg: "Internal Server Error.",
      });
    }
  }
);

export default userRoutes;
