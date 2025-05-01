export interface PropsPopupModal<T> {
    titulo: string;
    exibirModal: boolean;
    listaDados: T[];
    getLabel: (item: T) => string;
    onSelecionar: (item: T) => void;
    onClose: () => void;
}