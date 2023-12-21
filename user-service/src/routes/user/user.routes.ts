import { Request, Response, Router } from "express";
import { validateSchema } from "@middleware/validateSchema.middleware";
import {
  createNewUser,
  findUserByEmail,
  findUserById,
} from "@repositories/user/userRepository";
import {
  CreateNewUserSchema,
  CreateNewUserSchemaType,
  UpdateUserSchema,
  UpdateUserSchemaType,
} from "./userRouts.schema";
import {
  CreateTransactionHistoryParamsSchema,
  CreateTransactionHistoryParamsSchemaType,
} from "@systems/utils";

const userRoutes = Router();

userRoutes.post(
  "/createNewUser",
  validateSchema(CreateNewUserSchema),
  async (req: Request<{}, {}, CreateNewUserSchemaType>, res: Response) => {
    try {
      const { email, firstName, lastName } = req.body;
      const user = await findUserByEmail(email);

      if (user) {
        return res.status(400).json({
          msg: "user already exists",
        });
      }

      return res.status(201).json({
        id: await createNewUser({ email, firstName, lastName }),
      });
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        msg: "Internal Server Error.",
      });
    }
  }
);

userRoutes.put(
  "/updateUser/:userId",
  validateSchema(UpdateUserSchema),
  validateSchema(CreateTransactionHistoryParamsSchema, "p"),
  async (
    req: Request<
      CreateTransactionHistoryParamsSchemaType,
      {},
      UpdateUserSchemaType
    >,
    res: Response
  ) => {
    try {
      const { newEmail, newFirstName, newLastName, amount } = req.body;
      const { userId } = req.params;
      const user = await findUserById(userId);

      if (!user) {
        return res.status(404).json({
          msg: "user not found",
        });
      }

      const { firstName, lastName, balance, email } = user;

      return res.status(201).json({
        id: "Dsadsa",
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
