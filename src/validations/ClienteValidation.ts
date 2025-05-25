import * as yup from "yup";

export const validacoesFormularioCliente = yup.object({
    nome: yup.string().required("Informe seu nome"),
    telefone: yup.string().required("Informe seu telefone").min(11, 'O telefone deve conter o DDD e o 9 no início'),
    cpf: yup.string().required("Informe seu cpf").min(11, 'Cpf inválido'),
    email: yup.string().required("Informe seu email").email("Email inválido"),
    senha: yup.string().required("Informe sua senha").min(6, "A senha deve conter pelo menos 6 dígitos"),
    modeloVeiculo: yup.string().required("Informe o modelo do veículo"),
    anoVeiculo: yup.string().required("Informe o ano do veículo").min(4, 'O ano do veículo deve conter pelo menos 4 números')
});