import SendResponse from "../utils/SendResponse";
import { UserService } from "./../services/UserService";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as yup from "yup";
import {
  sessionValidation,
  createUserValidation,
  updateUserValidation,
} from "../validations/user.validation";
import { ProviderService } from "../services/ProviderService";

const providerService = new ProviderService();

export class ProviderController {
  async getProviders(req: Request, res: Response) {
    const providers = await providerService.getAllProviders();

    return SendResponse.success(
      res,
      200,
      "Busca de provedores foi realizada com sucesso.",
      providers
    );
  }
}
