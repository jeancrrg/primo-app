import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChaveAsyncStorage } from '../constants/ChaveAsyncStorage';

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
