import { validateSchema } from "@middleware/validateSchema.middleware";
import { Request, Response, Router } from "express";
import {
  AcceptTransactionBodySchema,
  AcceptTransactionBodySchemaType,
  AcceptTransactionParamsSchema,
  AcceptTransactionParamsSchemaType,
  CreateTransactionHistoryBodySchema,
  CreateTransactionHistoryBodySchemaType,
  CurrentUserParamsSchema,
  CurrentUserParamsSchemaType,
} from "./transactionRoutes.schema";
import {
  getUserById,
  updateUserBalance,
} from "@repositories/user/userRepository";
import {
  createNewTransaction,
  findTransactionById,
  updateTransaction,
  validateTransaction,
  validateTransactionAcceptance,
} from "@repositories/transaction/transactionRepository";
import { TransactionStatusEnum } from "@systems/utils";
import {
  createNewTransactionHistory,
  updateTransactionHistoryByTransactionId,
} from "@repositories/transactionHistory/transactionHistoryRepository";
import { sendNotification } from "@repositories/notification/notificationRepository";
import {
  getGroupBiId,
  isUserGroupAdmin,
  isUserPartOfGroup,
  updateGroupBalance,
} from "@repositories/group/groupRepository";

const transactionRoutes = Router();

transactionRoutes.post(
  "/createNewTransaction/:currentUser",
  validateSchema(CreateTransactionHistoryBodySchema),
  validateSchema(CurrentUserParamsSchema, "p"),
  async (
    req: Request<
      CurrentUserParamsSchemaType,
      {},
      CreateTransactionHistoryBodySchemaType
    >,
    res: Response
  ) => {
    try {
      const { currentUser } = req.params; // no auth required... we need to take it from JWT token in an auth middleware.
      const { amount, fromGroup, fromId, toGroup, toId } = req.body;
      const [receiverInfo, payingInfo] = await Promise.all([
        toGroup
          ? isUserPartOfGroup({ groupId: toId, userId: fromId })
          : getUserById(toId),
        fromGroup
          ? isUserGroupAdmin({ groupId: fromId, userId: currentUser })
          : getUserById(fromId),
      ]);
      const validation = validateTransaction({
        payingInfo,
        receiverInfo,
        amount,
      });

      if (validation) {
        const { msg, statusCode } = validation;

        return res.status(statusCode).json({
          msg,
        });
      }

      const transactionId = await createNewTransaction({
        amount,
        fromGroup,
        fromId,
        toGroup,
        toId,
      });

      await Promise.all([
        createNewTransactionHistory({
          amount,
          status: TransactionStatusEnum.WAITING,
          transactionId: transactionId.toString(),
          type: "outcome",
          userId: fromId,
        }),
        createNewTransactionHistory({
          amount,
          status: TransactionStatusEnum.WAITING,
          transactionId: transactionId.toString(),
          type: "income",
          userId: toId,
        }),
      ]);

      // send massage to notification service
      await sendNotification({
        amount,
        fromId,
        toId,
        transactionId: transactionId.toString(),
        toGroup,
        fromGroup,
      });

      return res.status(201).json({
        id: transactionId,
      });
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        msg: "Internal Server Error.",
      });
    }
  }
);

transactionRoutes.post(
  "/acceptTransaction/:transactionId/:currentUser",
  validateSchema(AcceptTransactionBodySchema),
  validateSchema(AcceptTransactionParamsSchema, "p"),
  async (
    req: Request<
      AcceptTransactionParamsSchemaType,
      {},
      AcceptTransactionBodySchemaType
    >,
    res: Response
  ) => {
    try {
      const { updatedStatus } = req.body;
      const { transactionId, currentUser } = req.params;
      const transaction = await findTransactionById(transactionId);
      const validateTransactionData = validateTransactionAcceptance(
        transaction,
        updatedStatus
      );

      if (validateTransactionData) {
        const { msg, statusCode } = validateTransactionData;
        return res.status(statusCode).json({
          msg,
        });
      }

      const { amount, toGroup, fromGroup, fromId, toId } = transaction!;
      const [receiverInfo, payingInfo] = await Promise.all([
        toGroup
          ? isUserGroupAdmin({ groupId: toId, userId: currentUser })
          : getUserById(toId),
        fromGroup ? getGroupBiId(fromId) : getUserById(fromId),
      ]);

      const validation = validateTransaction({
        payingInfo,
        receiverInfo,
        amount,
      });

      if (validation) {
        const { msg, statusCode } = validation;

        return res.status(statusCode).json({
          msg,
        });
      }

      await updateTransaction({ updatedStatus, transactionId });
      await updateTransactionHistoryByTransactionId({
        status: updatedStatus,
        transactionId,
      });

      if (updatedStatus === TransactionStatusEnum.CANCELED) {
        return res.status(201).json({
          msg: `transaction was ${TransactionStatusEnum.CANCELED}`,
        });
      }

      await Promise.all([
        toGroup
          ? updateGroupBalance(toId, amount)
          : updateUserBalance(toId, amount),
        fromGroup
          ? updateGroupBalance(fromId, amount * -1)
          : updateUserBalance(fromId, amount * -1),
      ]);

      // send massage to notification service
      await sendNotification({
        amount,
        fromGroup,
        fromId,
        toGroup,
        toId,
        transactionId,
      });

      return res.status(201).json({
        msg: `transaction is ${TransactionStatusEnum.DONE}`,
      });
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        msg: "Internal Server Error.",
      });
    }
  }
);

export default transactionRoutes;
