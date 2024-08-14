import { writeHeapSnapshot } from "v8";
import * as yup from "yup"; // Ajustado para a importação correta

const sessionValidation = yup.object({
  email: yup.string().required("Email é obrigatório").email("Email inválido"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const createUserValidation = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().required("Email é obrigatório").email("Email inválido"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const updateUserValidation = yup.object({
  name: yup.string().optional(),
  email: yup.string().email("Email inválido").optional(),
  password: yup
    .string()
    .optional()
    .nullable()
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export { sessionValidation, createUserValidation, updateUserValidation };
