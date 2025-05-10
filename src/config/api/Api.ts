import axios from "axios";
import { Contants } from "../../constants/Contants";
import { obterTokenAcesso } from "../../services/TokenAcesso.service";
import { isNotEmpty } from "../../utils/ValidationUtil";

const api = axios.create({
    baseURL: Contants.URL_BASE,
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

export default api;