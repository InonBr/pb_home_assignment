import { validateSchema } from "@middleware/validateSchema.middleware";
import { Request, Response, Router } from "express";
import {
  CreateNewGroupSchema,
  CreateNewGroupSchemaType,
  ValidUserIdParamsSchema,
  ValidUserIdParamsSchemaType,
} from "./groupRouts.schema";
import { getUserById } from "@repositories/user/userRepository";

const groupRoutes = Router();

groupRoutes.post(
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
      const user = await getUserById(userId);

      if (!user) {
        return res.status(404).json({
          msg: "user not found",
        });
      }

      console.log(user);

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

export default groupRoutes;
