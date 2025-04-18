export type RotasStack = {
    login: undefined;
    cadastro: undefined;
    tabs: undefined;
};

export interface RotasTabBar {
    'inicio': undefined;
    'pesquisa': undefined;
    'mapa': undefined;
    'servico': undefined;
    'perfil': undefined;
}

export interface TipoServico {
    nome: string;
    icone: string;
}

export interface PropsCardTipoServico {
    tipoServico: TipoServico;
    onPress: () => void;
}

export interface PropsCardSmall {
    nomeIcone: string;
    tipoInformacao: string;
    informacao: string;
}

export interface PropsBarraPesquisa {
    label: string;
}

export interface PropsCardPrestadorServico {
    codigo: number;
    nome: string;
    descricaoTipoServico: string;
    logradouro: string;
    nomeBairro: string;
    onSelect: () => void;
}
