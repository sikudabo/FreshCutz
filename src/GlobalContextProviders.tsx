import React from 'react';
import { AlertTypeContextProvider } from './contexts/SuccessOrErrorAlertContext';
import { ContextProviderProps } from './typings/types';

export default function GlobalContextProviders({ children }: ContextProviderProps) {
    return (
        <AlertTypeContextProvider>
            {children}
        </AlertTypeContextProvider>
    );
}