import { validateSchema } from "@middleware/validateSchema.middleware";
import { Request, Response, Router } from "express";
import {
  CreateTransactionHistoryBodySchema,
  CreateTransactionHistoryBodySchemaType,
} from "./transactionRoutes.schema";
import { getUserById } from "@repositories/user/userRepository";
import {
  createNewTransaction,
  validateTransaction,
} from "@repositories/transaction/transactionRepository";

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

      return res.status(201).json({
        id: await createNewTransaction({
          amount,
          fromGroup,
          fromId,
          toGroup,
          toId,
        }),
      });
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        msg: "Internal Server Error.",
      });
    }
  }
);
//     try {
//       const { amount, status } = req.body;
//       const { userId } = req.params;
//       const user = await getUserById(userId);

//       if (!user) {
//         return res.status(404).json({
//           msg: "user not found",
//         });
//       }

//       return res.status(201).json({
//         id: await createNewTransactionHistory({ amount, status, userId }),
//       });
//     } catch (err) {
//       console.log(err);

//       return res.status(500).json({
//         msg: "Internal Server Error.",
//       });
//     }
//   }
// );

// transactionHistoryRoutes.put(
//   "/updateTransactionHistory/:transactionId",
//   validateSchema(UpdateTransactionHistoryBodySchema),
//   validateSchema(UpdateTransactionHistoryParamsSchema, "p"),
//   async (
//     req: Request<
//       UpdateTransactionHistoryParamsSchemaType,
//       {},
//       UpdateTransactionHistoryBodySchemaType
//     >,
//     res: Response
//   ) => {
//     try {
//       const { status } = req.body;
//       const { transactionId } = req.params;
//       const transaction = await findTransactionHistoryById(transactionId);

//       if (!transaction) {
//         return res.status(404).json({
//           msg: "transaction not found",
//         });
//       }

//       await updateTransactionHistory({
//         status,
//         transactionId,
//       });

//       return res.status(201).json({
//         id: transactionId,
//       });
//     } catch (err) {
//       console.log(err);

//       return res.status(500).json({
//         msg: "Internal Server Error.",
//       });
//     }
//   }
// );

export default transactionRoutes;
