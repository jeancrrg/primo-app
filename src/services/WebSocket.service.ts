import { isNotEmpty } from "../utils/ValidationUtil";

let socket: WebSocket | null = null;

export function conectarWebSocket(codigoPrestador: number, onMessage: (data: any) => void): void {
    socket = new WebSocket(`ws://192.168.100.50:8096/primo-api/ws/prestador/${codigoPrestador}`);

    socket.onopen = () => {
        console.log("WebSocket conectado");
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Solicitação recebida:", data);
        onMessage(data);
    };

    socket.onerror = (error) => {
        console.error("Erro no WebSocket:", error);
    };

    socket.onclose = () => {
        console.log("WebSocket desconectado");
    };
}

export function disconectarWebSocket(): void {
    if (isNotEmpty(socket) && socket !== null) {
        socket.close();
    }
}
