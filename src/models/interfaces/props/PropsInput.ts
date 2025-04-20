export type PropsInput = {
    control: any;
    name: string;
    label: string;
    nomeIconeEsquerda?: string;
    nomeIconeDireita?: string;
    onPressIconeDireita?: () => void;
    mostrarValor?: boolean;
    maxLength: number;
    errosValidacao?: string;
}