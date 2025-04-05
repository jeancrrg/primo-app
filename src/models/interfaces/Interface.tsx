export interface Rotas {
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
    tipoServico: string;
    endereco: string;
    onSelect: () => void;
}

