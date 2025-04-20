import { TipoServico } from "../../TipoServico";

export interface PropsCardTipoServico {
    tipoServico: TipoServico;
    onPress: () => void;
}