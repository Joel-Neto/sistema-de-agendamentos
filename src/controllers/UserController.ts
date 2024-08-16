import SendResponse from "../utils/SendResponse";
import { UserService } from "./../services/UserService";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as yup from "yup";
import {
  sessionSchema,
  createUserSchema,
  updateUserSchema,
} from "../validations/user.validation";

const userService = new UserService();

export class UserController {
  async createUser(req: Request, res: Response) {
    const { name, email, password, provider } = req.body;

    try {
      // await createUserValidation.validate({ name, email, password });

      const userExists = await userService.getUserByEmail(email);

      if (userExists) {
        return SendResponse.error(res, 400, "E-mail já cadastrado no sistema.");
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = await userService.createUser(
        name,
        email,
        hashPassword,
        provider
      );

      const { password: _, ...createdUser } = newUser;

      SendResponse.success(
        res,
        201,
        "Usuário criado com sucesso.",
        createdUser
      );
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errorMessage = error.errors.join(", ");
        return SendResponse.error(res, 400, errorMessage);
      }

      return SendResponse.error(res, 500, "Ocorreu um erro interno.");
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      // await sessionValidation.validate({ email, password });

      const user = await userService.getUserByEmail(email);

      if (!user) {
        return SendResponse.error(res, 404, "E-mail ou senha inválidos.");
      }

      const verifyPass = await bcrypt.compare(password, user.password);

      if (!verifyPass) {
        return SendResponse.error(res, 400, "E-mail ou senha inválidos.");
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_PASS as string, {
        expiresIn: process.env.EXPIRES_IN,
      });

      const { password: _, ...userLogin } = user;

      return SendResponse.authLogin(
        res,
        200,
        "Login efetuado com sucesso.",
        userLogin,
        token
      );
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errorMessage = error.errors.join(", ");
        return SendResponse.error(res, 400, errorMessage);
      }

      return SendResponse.error(res, 500, "Erro interno de servidor.");
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const data = req.body;

      // await updateUserValidation.validate(req.body);

      const user = await userService.getUserById(req.user.id as string);
      if (!user) {
        return SendResponse.error(res, 401, "Usuário não encontrado.");
      }

      if (data.email && data.email !== user.email) {
        const userExists = await userService.getUserByEmail(data.email);
        if (userExists) {
          return SendResponse.error(
            res,
            400,
            "E-mail já cadastrado no sistema."
          );
        }
      }

      user.name = data.name || user.name;
      user.email = data.email || user.email;

      if (data.password) {
        user.password = await bcrypt.hash(data.password, 10);
      }

      if (data.avatar_id) {
        user.avatar_id = data.avatar_id;
      }

      const updatedUser = await userService.updateUser(user);

      const { password: _, ...updatedUserWithoutPassword } = updatedUser;

      return SendResponse.success(
        res,
        200,
        "Usuário atualizado com sucesso.",
        updatedUser
      );
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errorMessage = error.errors.join(", ");
        return SendResponse.error(res, 400, errorMessage);
      }

      console.log(error);
      return SendResponse.error(res, 500, "Erro interno de servidor.");
    }
  }
}
