import { FormularioLogin } from '../models/interfaces/formularios/FormularioLogin.interface';
import Api from "../config/api/Api";
import { LoginDTO } from "../models/dto/LoginDTO.model";

export async function realizarLogin(FormularioLogin: FormularioLogin): Promise<LoginDTO> {
    return (await Api.post('/autenticacoes/login', FormularioLogin)).data;
}
