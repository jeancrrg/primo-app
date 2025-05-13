import api from "../config/api/Api";
import { UsuarioCliente } from "../models/cadastro/UsuarioCliente";

export async function buscarUsuarioCliente(codigoUsuario: number): Promise<UsuarioCliente> {
    try {
        const response = await api.get('/usuarios/cliente', {
            params: { codigoUsuario }
        });
        return response.data;
    } catch (error: any) {
        console.error('Erro ao buscar o usuário de cliente! - ', error);
        throw new Error('Erro ao buscar o usuário de cliente!');
    }
}