import axios from "axios";
import { Contants } from "../../constants/Contants";
import { obterTokenAcesso } from "../../services/TokenAcesso.service";
import { isNotEmpty } from "../../utils/ValidationUtil";

const api = axios.create({
    baseURL: Contants.URL_BASE,
});

// Interceptor para incluir token em todas as requisições
api.interceptors.request.use(
    async config => {
        const token: string | null = await obterTokenAcesso();
        if (isNotEmpty(token) && isNotEmpty(config.headers)) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export default api;