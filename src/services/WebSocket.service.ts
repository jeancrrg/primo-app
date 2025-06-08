import { isNotEmpty } from "../utils/ValidationUtil";

let webSocket: WebSocket | null = null;

export function conectarWebSocket(codigoPrestador: number, onMessage: (data: any) => void): void {
    webSocket = new WebSocket(`ws://192.168.100.50:8096/primo-api/ws/prestador/${codigoPrestador}`);

    webSocket.onopen = () => {
        console.log("WebSocket conectado");
    };

    webSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Solicitação recebida!");
        onMessage(data);
    };

    webSocket.onerror = (error) => {
        console.error("Erro no WebSocket:", error);
    };

    webSocket.onclose = () => {
        console.log("WebSocket desconectado");
    };
}

export function disconectarWebSocket(): void {
    if (isNotEmpty(webSocket) && webSocket !== null) {
        webSocket.close();
    }
}
