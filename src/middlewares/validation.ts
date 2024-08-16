import { Response, Request, NextFunction } from "express";
import { Schema, ValidationError } from "yup";

const validate =
  (schema: Schema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      await schema.validate(body, {
        strict: true,
        abortEarly: false,
      });
      return next();
    } catch (err: any) {
      const { name, message, errors } = err as ValidationError;
      return res.status(500).json({ name, message, errors });
    }
  };

export { validate };
