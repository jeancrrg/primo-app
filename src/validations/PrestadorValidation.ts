import * as yup from 'yup';

export const validacoesFormularioPrestador = yup.object({
    nome: yup.string().required('Informe seu nome'),
    telefone: yup.string().required('Informe seu telefone'),
    email: yup.string().required('Informe seu email').email('Email inválido'),
    senha: yup.string().required('Informe sua senha').min(6, 'A senha deve conter pelo menos 6 dígitos'),
    cnpj: yup.string().required('Informe o cnpj da sua empresa'),
    endereco: yup.string().required('Informe o endereço da sua empresa'),
    tipoServico: yup.string().required('Informe seu tipo de serviço'),
    valorServico: yup.string().required('Informe o valor do seu serviço')
});