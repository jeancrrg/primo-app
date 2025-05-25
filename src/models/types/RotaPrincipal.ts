import { RotaPrincipalEnum } from "../enum/RotaPrincipal.enum";

export type RotaPrincipal = {
    [RotaPrincipalEnum.LOGIN]: undefined;
    [RotaPrincipalEnum.ESQUECI_SENHA]: undefined;
    [RotaPrincipalEnum.OPCAO_CADASTRO]: undefined;
    [RotaPrincipalEnum.CADASTRO_CLIENTE]: undefined;
    [RotaPrincipalEnum.CADASTRO_PRESTADOR]: undefined;
    [RotaPrincipalEnum.TABS]: undefined;
};