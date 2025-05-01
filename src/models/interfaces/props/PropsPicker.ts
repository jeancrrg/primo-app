export interface PropsPicker<T> {
    label: string;
    icone: string;
    valorSelecionado?: T | null;
    listaDados: T[];
    getLabel: (item: T) => string;
    onSelecionar: (item: T) => void;
}