import { validateSchema } from "@middleware/validateSchema.middleware";
import { Request, Response, Router } from "express";
import {
  CreateNewGroupSchema,
  CreateNewGroupSchemaType,
  ValidGroupAndUserIdParamsType,
  ValidGroupIdParamsSchema,
  ValidGroupIdParamsSchemaType,
  ValidUserIdParamsSchema,
  ValidUserIdParamsSchemaType,
} from "./groupRouts.schema";
import { getUserById } from "@repositories/user/userRepository";
import {
  createNewGroup,
  findGroupById,
} from "@repositories/group/groupRepository";

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

      const id = await createNewGroup({ groupName, userId });

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

groupRoutes.get(
  "/getGroup/:groupId",
  validateSchema(ValidGroupIdParamsSchema, "p"),
  async (req: Request<ValidGroupIdParamsSchemaType, {}, {}>, res: Response) => {
    try {
      const { groupId } = req.params;

      return res.status(200).json({
        group: await findGroupById(groupId),
      });
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        msg: "Internal Server Error.",
      });
    }
  }
);

groupRoutes.get(
  "/isGroupAdmin/:groupId/:userId",
  validateSchema(ValidGroupIdParamsSchema, "p"),
  validateSchema(ValidUserIdParamsSchema, "p"),
  async (
    req: Request<ValidGroupAndUserIdParamsType, {}, {}>,
    res: Response
  ) => {
    try {
      const { groupId, userId } = req.params;

      console.log(groupId);
      console.log(userId);

      return res.status(200).json({
        group: "dsadsadas",
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
