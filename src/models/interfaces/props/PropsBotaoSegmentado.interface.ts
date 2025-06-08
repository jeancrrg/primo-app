export interface PropsBotaoSegmentado {
    opcoes: string[];
    opcaoSelecionada: string;
    onSelecionar: (opcao: string) => void;
}