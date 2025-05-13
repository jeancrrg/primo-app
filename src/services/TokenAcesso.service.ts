import AsyncStorage from '@react-native-async-storage/async-storage';
import { CHAVE_TOKEN } from '../constants/ChaveAsyncStorage';

export async function obterTokenAcesso(): Promise<string | null> {
    let token: string | null = null;
    await AsyncStorage.getItem(CHAVE_TOKEN)
        .then(async valor => {
            token = valor;
        });
    return token;
}

export function salvarTokenAcesso(tokenAcesso: string): void {
    AsyncStorage.setItem(CHAVE_TOKEN, tokenAcesso);
}

export function removerTokenAcesso(): void {
    AsyncStorage.removeItem(CHAVE_TOKEN);
}
