import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repositories/userRepository";
import jwt from "jsonwebtoken";
import SendResponse from "../utils/SendResponse";

type JwlPayload = {
  id: string;
};

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return SendResponse.error(res, 401, "Token inválido.");
    }

    const [isBearer, token] = authorization.split(" ");

    if (isBearer !== "Bearer") {
      return SendResponse.error(res, 401, "Token inválido.");
    }

    const { id } = jwt.verify(
      token,
      process.env.JWT_PASS as string
    ) as JwlPayload;

    const user = await userRepository.findOneBy({ id });

    if (!user) {
      return SendResponse.error(res, 401, "Não autorizado.");
    }

    const { password: _, ...loggedUser } = user;

    req.user = {
      ...loggedUser,
    };

    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return SendResponse.error(res, 401, "Token inválido.");
    }
    return SendResponse.error(res, 500, "Ocorreu um erro interno.");
  }
}
