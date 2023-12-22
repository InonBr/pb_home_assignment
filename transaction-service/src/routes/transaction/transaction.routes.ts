import { validateSchema } from "@middleware/validateSchema.middleware";
import { Request, Response, Router } from "express";
import {
  AcceptTransactionBodySchema,
  AcceptTransactionBodySchemaType,
  AcceptTransactionParamsSchema,
  AcceptTransactionParamsSchemaType,
  CreateTransactionHistoryBodySchema,
  CreateTransactionHistoryBodySchemaType,
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

const transactionRoutes = Router();

transactionRoutes.post(
  "/createNewTransaction",
  validateSchema(CreateTransactionHistoryBodySchema),
  async (
    req: Request<{}, {}, CreateTransactionHistoryBodySchemaType>,
    res: Response
  ) => {
    try {
      const { amount, fromGroup, fromId, toGroup, toId } = req.body;
      const [receiverInfo, payingInfo] = await Promise.all([
        toGroup ? getUserById(toId) : getUserById(toId),
        fromGroup ? getUserById(fromId) : getUserById(fromId),
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
      const { firstName, lastName, email } = receiverInfo;
      await sendNotification({
        amount,
        name: `${firstName} ${lastName}`,
        userEmail: email,
        type: "income",
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
  "/acceptTransaction/:transactionId",
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
      const { transactionId } = req.params;
      const transaction = await findTransactionById(transactionId);
      const validate = validateTransactionAcceptance(
        transaction,
        updatedStatus
      );

      if (validate) {
        const { msg, statusCode } = validate;
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

      const { amount, toGroup, fromGroup, fromId, toId } = transaction!;
      const [receiverInfo, payingInfo] = await Promise.all([
        toGroup ? getUserById(toId) : getUserById(toId),
        fromGroup ? getUserById(fromId) : getUserById(fromId),
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

      await Promise.all([
        toGroup
          ? updateUserBalance(toId, amount)
          : updateUserBalance(toId, amount),
        fromGroup
          ? updateUserBalance(fromId, amount * -1)
          : updateUserBalance(fromId, amount * -1),
      ]);

      // send massage to notification service
      const { firstName, lastName, email } = payingInfo;
      await sendNotification({
        amount,
        name: `${firstName} ${lastName}`,
        userEmail: email,
        type: "outcome",
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
