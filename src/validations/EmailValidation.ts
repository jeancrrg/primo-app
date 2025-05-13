import * as yup from "yup";

export const validacaoEmail = yup.object({
    email: yup.string().required('Informe seu email').email('Email inválido')
});