export interface TipoServico {
    nome: string;
    icone: string;
}

export interface PropsCardTipoServico {
    tipoServico: TipoServico;
    onPress: () => void;
}