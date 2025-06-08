import Api from "../config/api/Api";
import { Avatar } from "../models/cadastro/Avatar.model";
import { isEmpty, isNotEmpty } from "../utils/ValidationUtil";

export async function buscarAvatares(codigo?: number): Promise<Avatar[]> {
    const parametros: any = {};
    if (isNotEmpty(codigo)) {
        parametros.codigo = codigo;
    }
    return (await Api.get('/avatares', { params: parametros })).data;
}

const imagensAvatares: { [key: number]: any } = {
    1: require('../../assets/images/avatares/sem-avatar.png'),
    2: require('../../assets/images/avatares/avatar-jean.png'),
    3: require('../../assets/images/avatares/avatar-1.png'),
    4: require('../../assets/images/avatares/avatar-2.png'),
    5: require('../../assets/images/avatares/avatar-3.png'),
    6: require('../../assets/images/avatares/avatar-4.png'),
    7: require('../../assets/images/avatares/avatar-5.png'),
    8: require('../../assets/images/avatares/avatar-maria-cecilia.png'),
};

export function obterImagemAvatar(codigoAvatar: number | undefined) {
    if (isEmpty(codigoAvatar)) {
        return imagensAvatares[1];
    }
    return imagensAvatares[codigoAvatar!];
}
