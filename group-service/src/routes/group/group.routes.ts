import { validateSchema } from "@middleware/validateSchema.middleware";
import { Request, Response, Router } from "express";
import {
  AddToGroupSchema,
  AddToGroupSchemaType,
  CreateNewGroupSchema,
  CreateNewGroupSchemaType,
  UpdateGroupSchema,
  UpdateGroupSchemaType,
  ValidGroupAndUserIdParamsType,
  ValidGroupIdParamsSchema,
  ValidGroupIdParamsSchemaType,
  ValidUserIdParamsSchema,
  ValidUserIdParamsSchemaType,
} from "./groupRouts.schema";
import { getUserById } from "@repositories/user/userRepository";
import {
  addUserToGroup,
  createNewGroup,
  findGroupById,
  isGroupAdmin,
  isPartOfGroup,
  updateGroup,
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

groupRoutes.put(
  "/updateGroup/:groupId",
  validateSchema(UpdateGroupSchema),
  validateSchema(ValidGroupIdParamsSchema, "p"),
  async (
    req: Request<ValidGroupIdParamsSchemaType, {}, UpdateGroupSchemaType>,
    res: Response
  ) => {
    try {
      const { balance } = req.body;
      const { groupId } = req.params;
      await updateGroup(groupId, balance);

      return res.status(201).json({
        id: groupId,
      });
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        msg: "Internal Server Error.",
      });
    }
  }
);

groupRoutes.put(
  "/addToGroup/:groupId",
  validateSchema(AddToGroupSchema),
  validateSchema(ValidGroupIdParamsSchema, "p"),
  async (
    req: Request<ValidGroupIdParamsSchemaType, {}, AddToGroupSchemaType>,
    res: Response
  ) => {
    try {
      const { adminId, userToAdd } = req.body;
      const { groupId } = req.params;
      const [user, group] = await Promise.all([
        getUserById(userToAdd),
        isGroupAdmin(groupId, adminId),
      ]);

      if (!user || !group) {
        return res.status(404).json({
          msg: "not found",
        });
      }

      await addUserToGroup(groupId, userToAdd);

      const { _id, usersArr, adminsArr, groupName } = group;
      return res.status(200).json({
        group: {
          _id,
          adminsArr,
          groupName,
          usersArr: [...usersArr, userToAdd],
        },
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

      return res.status(200).json({
        group: await isGroupAdmin(groupId, userId),
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
  "/isPartOfGroup/:groupId/:userId",
  validateSchema(ValidGroupIdParamsSchema, "p"),
  validateSchema(ValidUserIdParamsSchema, "p"),
  async (
    req: Request<ValidGroupAndUserIdParamsType, {}, {}>,
    res: Response
  ) => {
    try {
      const { groupId, userId } = req.params;

      return res.status(200).json({
        group: await isPartOfGroup(groupId, userId),
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
