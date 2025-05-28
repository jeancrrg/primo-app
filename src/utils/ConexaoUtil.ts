import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export async function verificarEstaConectado(): Promise<boolean | null> {
    const estadoConexao: NetInfoState = await NetInfo.fetch();
    return estadoConexao.isConnected && estadoConexao.isInternetReachable !== false;
}