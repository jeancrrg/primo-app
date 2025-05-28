import { ChaveAsyncStorage } from "../constants/ChaveAsyncStorage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isNotEmpty } from "../utils/ValidationUtil";
import { TipoPessoaEnum } from "../models/enum/TipoPessoa.enum";

export async function obterTokenAcesso(): Promise<string | null> {
    let token: string | null = null;
    await AsyncStorage.getItem(ChaveAsyncStorage.CHAVE_TOKEN)
        .then(async valor => {
            token = valor;
        });
    return token;
}

export function salvarTokenAcesso(tokenAcesso: string): void {
    AsyncStorage.setItem(ChaveAsyncStorage.CHAVE_TOKEN, tokenAcesso);
}

export function removerTokenAcesso(): void {
    AsyncStorage.removeItem(ChaveAsyncStorage.CHAVE_TOKEN);
}

export async function salvarCodigoPessoaLogado(codigoPessoa: number): Promise<void> {
    AsyncStorage.setItem(ChaveAsyncStorage.CHAVE_CODIGO_PESSOA, codigoPessoa.toString());
}

export async function obterCodigoPessoaLogado(): Promise<number | null> {
    let codigoPessoa: number | null = null;
    await AsyncStorage.getItem(ChaveAsyncStorage.CHAVE_CODIGO_PESSOA)
        .then(async valor => {
            if (isNotEmpty(valor)) {
                codigoPessoa = Number(valor);
            }
        });
    return codigoPessoa;
}

export async function removerCodigoPessoaLogado(): Promise<void> {
    await AsyncStorage.removeItem(ChaveAsyncStorage.CHAVE_CODIGO_PESSOA);
}

export async function salvarTipoPessoaLogado(tipoPessoa: TipoPessoaEnum): Promise<void> {
    AsyncStorage.setItem(ChaveAsyncStorage.CHAVE_TIPO_PESSOA, tipoPessoa.toString());
}

export async function obterTipoPessoaLogado(): Promise<TipoPessoaEnum | null> {
    let tipoPessoa: TipoPessoaEnum | null = null;
    await AsyncStorage.getItem(ChaveAsyncStorage.CHAVE_TIPO_PESSOA)
        .then(async valor => {
            if (isNotEmpty(valor)) {
                tipoPessoa = TipoPessoaEnum[valor as keyof typeof TipoPessoaEnum];;
            }
        });
    return tipoPessoa;
}

export async function removerTipoPessoaLogado(): Promise<void> {
    await AsyncStorage.removeItem(ChaveAsyncStorage.CHAVE_TIPO_PESSOA);
}
