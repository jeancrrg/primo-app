import * as yup from "yup";

export const validacoesFormularioCliente = yup.object({
    nome: yup.string().required("Informe seu nome"),
    telefone: yup.string().required("Informe seu telefone"),
    email: yup.string().required("Informe seu email").email("Email inválido"),
    senha: yup.string().required("Informe sua senha").min(6, "A senha deve conter pelo menos 6 dígitos"),
    modeloVeiculo: yup.string().required("Informe o modelo do veículo"),
    anoVeiculo: yup.string().required("Informe o ano do veículo")
});
