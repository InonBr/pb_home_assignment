import { Request, Response, Router } from "express";
import { validateSchema } from "@middleware/validateSchema.middleware";
import {
  createNewUser,
  findUserByEmail,
  findUserById,
  updateUserData,
} from "@repositories/user/userRepository";
import {
  CreateNewUserSchema,
  CreateNewUserSchemaType,
  UpdateUserSchema,
  UpdateUserSchemaType,
  ValidUserIdParamsSchema,
  ValidUserIdParamsSchemaType,
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
  validateSchema(ValidUserIdParamsSchema, "p"),
  async (
    req: Request<ValidUserIdParamsSchemaType, {}, UpdateUserSchemaType>,
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
      const newBalance = balance + (amount ? amount : 0);

      if (newBalance < 0) {
        return res.status(400).json({
          msg: "balance cannot be less then 0, transaction denied",
        });
      }

      await updateUserData({
        balance: newBalance,
        firstName: newFirstName || firstName,
        lastName: newLastName || lastName,
        email: newEmail || email,
        userId,
      });

      return res.status(201).json({
        id: userId,
      });
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        msg: "Internal Server Error.",
      });
    }
  }
);

userRoutes.get(
  "/getUser/:userId",
  validateSchema(ValidUserIdParamsSchema, "p"),
  async (req: Request<ValidUserIdParamsSchemaType, {}, {}>, res: Response) => {
    try {
      const { userId } = req.params;

      return res.status(200).json({
        user: await findUserById(userId),
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
