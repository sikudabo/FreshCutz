import React, { createContext, useContext, useState, useEffect } from 'react';

type AlertTypeContextProps = {
    alertType: string | null;
}

const AlertTypeContextState = createContext<AlertTypeContextProps>({ alertType: '' });
const AlertTypeContextUpdate = createContext<any>({});

function AlertTypeContextProvider({ children }: { children: React.ReactNode }) {
    const [alertType, setAlertType] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setAlertType('');
        }, 10000);
    }, [alertType]);

    return (
        <AlertTypeContextState.Provider value={{ alertType }}>
            <AlertTypeContextUpdate.Provider value={{ setAlertType }}>
                {children}
            </AlertTypeContextUpdate.Provider>
        </AlertTypeContextState.Provider>
    );
}

function useAlertTypeState() {
    const context = useContext(AlertTypeContextState);
    return context;
}

function useAlertTypeUpdate() {
    const context = useContext(AlertTypeContextUpdate);
    return context;
}

export { AlertTypeContextProvider, useAlertTypeState, useAlertTypeUpdate };