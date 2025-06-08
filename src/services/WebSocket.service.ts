import { InformacaoClienteDTO } from "../models/dto/InformacaoClienteDTO.model";
import { isNotEmpty } from "../utils/ValidationUtil";

let webSocket: WebSocket | null = null;

export function conectarWebSocket(codigoPrestador: number, onMessage: (informacaoClienteDTO: InformacaoClienteDTO) => void): void {
    webSocket = new WebSocket(`ws://192.168.100.50:8096/primo-api/ws/prestador/${codigoPrestador}`);

    webSocket.onopen = () => {
        console.log("[WEB SOCKET] - Conexão realizada com sucesso!");
    };

    webSocket.onmessage = (event) => {
        const informacaoClienteDTO: InformacaoClienteDTO = JSON.parse(event.data);
        console.log(`[WEB SOCKET] - Solicitação recebida com sucesso do cliente: ${informacaoClienteDTO.codigo}!`);	
        onMessage(informacaoClienteDTO);
    };

    webSocket.onerror = (error) => {
        console.error("[WEB SOCKET] - Ocorreu um erro inesperado no WebSocket! - ", error);
    };

    webSocket.onclose = () => {
        console.log("[WEB SOCKET] - WebSocket desconectado");
    };
}

export function disconectarWebSocket(): void {
    if (isNotEmpty(webSocket) && webSocket !== null) {
        webSocket.close();
    }
}
