import axios from "axios";
import { isNotEmpty } from "../../utils/ValidationUtil";
import { UrlApi } from "../../constants/UrlApi";
import Toast from "react-native-toast-message";
import { verificarEstaConectado } from "../../utils/ConexaoUtil";
import { obterTokenAcesso } from "../../services/Storage.service";

const api = axios.create({
    baseURL: UrlApi.URL_BASE,
    timeout: 10000, // 10 segundos
});

const endpointsPublicos: string[] = [
    '/autenticacao/login',
    '/autenticacao/cadastro/cliente',
    '/autenticacao/cadastro/prestador',
    '/tipos-servico',
];

// Interceptor para incluir token em requisições privadas
api.interceptors.request.use(
    async config => {
        const estaOnline: boolean | null = await verificarEstaConectado();

        if (!estaOnline) {
            Toast.show({ type: 'erro', text1: 'SEM CONEXÃO', text2: 'Ops! Você está offline. Verifique sua conexão com a internet' });
            return Promise.reject({
                message: 'Dispositivo offline',
                isOffline: true,
            });
        }

        const isEndpointPublico: boolean = endpointsPublicos.some((url) =>
            config.url?.startsWith(url)
        );
        if (!isEndpointPublico) {
            const token: string | null = await obterTokenAcesso();
            if (isNotEmpty(token) && isNotEmpty(config.headers)) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    error => Promise.reject(error)
);

// Interceptor para tratamento de erros de resposta de api
api.interceptors.response.use(
    response => response,
    error => {
        // Se o erro for causado por conexão interrompida após a requisição
        if (!error.response && !error.isOffline) {
            Toast.show({ type: 'info', text1: 'SEM CONEXÃO', text2: 'Ops! Você está offline. Verifique sua conexão com a internet' });
            return Promise.reject(error);
        }

        const codigoStatus: number = error.response?.status;
        const mensagemErro: string = error.response?.data?.mensagem;

        if (codigoStatus == 400 || codigoStatus == 409) {
            Toast.show({ type: 'erro', text1: 'FALHA', text2: mensagemErro });
        }
        if (codigoStatus == 500) {
            Toast.show({ type: 'erro', text1: 'ERRO', text2: mensagemErro || 'Ocorreu um erro inesperado! Entre em contato com o suporte' });
        }
        return Promise.reject(error);
    }
);

export default api;