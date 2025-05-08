import * as yup from "yup";

export const validacoesFormularioLogin = yup.object({
    login: yup.string().required('Informe seu email').email('Email inválido'),
    senha: yup.string().required('Informe sua senha').min(6, 'A senha deve conter pelo menos 6 dígitos')
});