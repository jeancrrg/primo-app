import Api from "../config/api/Api";
import { Avatar } from "../models/cadastro/Avatar";
import { isEmpty, isNotEmpty } from "../utils/ValidationUtil";

export async function buscarAvatares(codigo?: number): Promise<Avatar[]> {
    try {
        const parametros: any = {};
        if (isNotEmpty(codigo)) {
            parametros.codigo = codigo;
        }
        const response = await Api.get('/avatares', { params: parametros });
        return response.data;
    } catch (error: any) {
        console.error('Erro ao buscar os avatares! - ', error);
        throw new Error('Erro ao buscar os avatares!');
    }
}

const imagensAvatares: { [key: number]: any } = {
    1: require('../../assets/images/avatares/sem-avatar.png'),
    2: require('../../assets/images/avatares/avatar-jean.png'),
    3: require('../../assets/images/avatares/avatar-1.png'),
    4: require('../../assets/images/avatares/avatar-2.png'),
    5: require('../../assets/images/avatares/avatar-3.png'),
    6: require('../../assets/images/avatares/avatar-4.png'),
    7: require('../../assets/images/avatares/avatar-5.png'),
};

export function obterImagemAvatar(codigoAvatar: number | undefined) {
    if (isEmpty(codigoAvatar)) {
        return imagensAvatares[1];
    }
    return imagensAvatares[codigoAvatar!];
}
