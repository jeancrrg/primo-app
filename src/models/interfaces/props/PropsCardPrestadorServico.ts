export interface PropsCardPrestadorServico {
    codigo: number;
    nome: string;
    descricaoTipoServico: string;
    logradouro: string;
    nomeBairro: string;
    onSelect: () => void;
}