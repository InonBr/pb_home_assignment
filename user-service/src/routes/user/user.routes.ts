import { Request, Response, Router } from "express";
import { validateSchema } from "@middleware/validateSchema.middleware";
import {
  createNewUser,
  findUserByEmail,
} from "@repositories/user/userRepository";
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
      const user = await findUserByEmail(email);

      if (user) {
        return res.status(404).json({
          msg: "user already exists",
        });
      }

      const id = await createNewUser({ email, firstName, lastName });

      return res.status(201).json({
        id,
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
