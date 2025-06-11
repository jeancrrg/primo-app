import { createContext, useContext, useState, ReactNode } from 'react';

interface PrestadorConexaoContextData {
    indicadorConectado: boolean;
    setIndicadorConectado: (indicador: boolean) => void;
}

interface ConexaoPrestadorProviderProps {
    children: ReactNode;
}

const ConexaoPrestadorContext = createContext<PrestadorConexaoContextData | undefined>(undefined);

export function ConexaoPrestadorProvider({ children }: ConexaoPrestadorProviderProps): JSX.Element {
    const [indicadorConectado, setIndicadorConectado] = useState<boolean>(false);
    return (
        <ConexaoPrestadorContext.Provider value={{ indicadorConectado: indicadorConectado, setIndicadorConectado: setIndicadorConectado }}>
            {children}
        </ConexaoPrestadorContext.Provider>
    );
}

export function useConexaoPrestador(): PrestadorConexaoContextData {
    const context = useContext(ConexaoPrestadorContext);
    if (!context) {
        throw new Error('useConexaoPrestador deve ser usado dentro de um ConexaoPrestadorProvider');
    }
    return context;
}

export default ConexaoPrestadorProvider;