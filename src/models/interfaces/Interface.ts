export type RotasStack = {
    login: undefined;
    opcaoCadastro: undefined;
    cadastroCliente: undefined;
    cadastroPrestador: undefined;
    tabs: undefined;
};

export interface RotasTabBar {
    inicio: undefined;
    pesquisa: undefined;
    mapa: undefined;
    servico: undefined;
    perfil: undefined;
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

export interface PropsCardPrestadorServico {
    codigo: number;
    nome: string;
    descricaoTipoServico: string;
    logradouro: string;
    nomeBairro: string;
    onSelect: () => void;
}

export interface PropsBotao {
    label: string;
    onPress: () => void;
}

export interface PropsInput {
    label: string;
    valor: any;
    onChangeText: (text: string) => void;
    nomeIconeEsquerda?: string;
    nomeIconeDireita?: string;
    onPressIconeDireita?: () => void;
    mostrarValor?: boolean;
    maxLength: number;
}
