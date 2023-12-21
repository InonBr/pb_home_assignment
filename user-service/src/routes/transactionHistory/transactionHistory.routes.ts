import { validateSchema } from "@middleware/validateSchema.middleware";
import { Request, Response, Router } from "express";
import {
  CreateTransactionHistoryBodySchema,
  CreateTransactionHistoryBodySchemaType,
  CreateTransactionHistoryParamsSchema,
  CreateTransactionHistoryParamsSchemaType,
} from "./transactionHistoryRoutes.schema";
import { findUserById } from "@repositories/user/userRepository";
import { createNewTransactionHistory } from "@repositories/transactionHistory/transactionHistoryRepository";

const transactionHistoryRoutes = Router();

transactionHistoryRoutes.post(
  "/createNewTransactionHistory/:userId",
  validateSchema(CreateTransactionHistoryBodySchema),
  validateSchema(CreateTransactionHistoryParamsSchema, "p"),
  async (
    req: Request<
      CreateTransactionHistoryParamsSchemaType,
      {},
      CreateTransactionHistoryBodySchemaType
    >,
    res: Response
  ) => {
    try {
      const { amount, status } = req.body;
      const { userId } = req.params;
      const user = await findUserById(userId);

      if (!user) {
        return res.status(404).json({
          msg: "user not found",
        });
      }

      return res.status(201).json({
        id: await createNewTransactionHistory({ amount, status, userId }),
      });
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        msg: "Internal Server Error.",
      });
    }
  }
);

// transactionHistoryRoutes.put(
//   "/updateTransactionHistory/:transactionId",
//   validateSchema(CreateTransactionHistoryBodySchema),
//   validateSchema(CreateTransactionHistoryParamsSchema, "p"),
//   async (
//     req: Request<
//       CreateTransactionHistoryParamsSchemaType,
//       {},
//       CreateTransactionHistoryBodySchemaType
//     >,
//     res: Response
//   ) => {
//     try {
//       const { amount, status } = req.body;
//       const { userId } = req.params;
//       const user = await findUserById(userId);

//       if (!user) {
//         return res.status(404).json({
//           msg: "user not found",
//         });
//       }

//       return res.status(201).json({
//         id: "dsa",
//       });
//     } catch (err) {
//       console.log(err);

//       return res.status(500).json({
//         msg: "Internal Server Error.",
//       });
//     }
//   }
// );

export default transactionHistoryRoutes;
