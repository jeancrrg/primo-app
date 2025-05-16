import { useEffect, useState } from "react";
import { TipoPessoaEnum } from "../models/enum/TipoPessoa.enum";
import TabsClienteRoute from "../routes/TabsClienteRoute.routes";
import TabsPrestadorRoute from "../routes/TabsPrestadorRoute.routes";
import { obterTipoPessoaLogado } from "../services/Autenticacao.service";

export default function RedirecionamentoTipoAcessoUtil(): JSX.Element {

    const [tipoPessoa, setTipoPessoa] = useState<TipoPessoaEnum | null>(null);

    useEffect(() => {
        carregarTipoPessoaLogado();
    }, []);

    async function carregarTipoPessoaLogado(): Promise<void> {
        const tipo: TipoPessoaEnum | null = await obterTipoPessoaLogado();
        setTipoPessoa(tipo);
    }

    return (
        tipoPessoa == TipoPessoaEnum.PRESTADOR ? <TabsPrestadorRoute /> : <TabsClienteRoute />
    );
}
