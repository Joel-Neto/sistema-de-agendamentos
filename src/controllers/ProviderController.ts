import SendResponse from "../utils/SendResponse";
import { Request, Response } from "express";
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
