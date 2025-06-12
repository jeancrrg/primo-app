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

const endpointsPublicos: { url: string; method: string }[] = [
    { url: '/autenticacao/login', method: 'POST' },
    { url: '/clientes', method: 'POST' },
    { url: '/prestadores-servico', method: 'POST' },
    { url: '/tipos-servico', method: 'GET' },
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

        const isEndpointPublico: boolean = endpointsPublicos.some(
            (endpoint) => config.url === endpoint.url && config.method?.toUpperCase() === endpoint.method.toUpperCase()
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

export default api;