let socket: WebSocket | null = null;

export function connectWebSocket(
    prestadorId: string,
    onMessage: (data: any) => void
): void {
    socket = new WebSocket(
        `ws://192.168.100.50:8096/primo-api/ws/prestador/${prestadorId}`
    );

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

export function disconnectWebSocket() {
    if (socket) {
        socket.close();
    }
}
