import { NextFunction, Request, Response } from "express";
import { ValidationError, ObjectSchema } from "yup";

export const validateSchema = (
  schema: ObjectSchema<any>,
  test: "b" | "p" | "q" = "b"
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataToValidate = getDataToValidate(req, test);

      await schema.validate(dataToValidate, {
        abortEarly: false,
        stripUnknown: true,
      });

      next();
    } catch (err: any) {
      console.error(err);

      if (err instanceof ValidationError) {
        res.status(400).json({ errors: err.errors });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
};

const getDataToValidate = (req: Request, test: "b" | "p" | "q") => {
  switch (test) {
    case "b":
      return req.body;
    case "p":
      return req.params;
    case "q":
      return req.query;
    default:
      throw new Error("Invalid test type");
  }
};
