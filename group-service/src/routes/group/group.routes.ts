import { validateSchema } from "@middleware/validateSchema.middleware";
import { Request, Response, Router } from "express";
import {
  CreateNewGroupSchema,
  CreateNewGroupSchemaType,
  ValidUserIdParamsSchema,
  ValidUserIdParamsSchemaType,
} from "./groupRouts.schema";

const userRoutes = Router();

userRoutes.post(
  "/createNewGroup/:userId",
  validateSchema(CreateNewGroupSchema),
  validateSchema(ValidUserIdParamsSchema, "p"),
  async (
    req: Request<ValidUserIdParamsSchemaType, {}, CreateNewGroupSchemaType>,
    res: Response
  ) => {
    try {
      const { groupName } = req.body;
      const { userId } = req.params;

      console.log(userId);
      console.log(groupName);

      return res.status(200).json({
        id: "dsadsada",
      });
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        msg: "Internal Server Error.",
      });
    }
  }
);
