import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useAlertTypeState } from '../contexts/SuccessOrErrorAlertContext';

type CustomAlertDisplayLayerProps = {
    alertType: any;
    msg: string;
};

export default function CustomAlert({ msg }: { msg: string }) {
    return <CustomAlertDisplayLayer msg={msg} {...useDataLayer()} />
}

function CustomAlertDisplayLayer({ alertType, msg }: CustomAlertDisplayLayerProps) {
    if (!alertType) {
        return null;
    } else {
        return (
            <Alert severity={alertType === 'error' ? 'error' : 'success'}>
                <AlertTitle>
                    {alertType === 'error' ? 'Error' : 'Success'}
                </AlertTitle>
                {msg}
            </Alert>
        );
    }
}

function useDataLayer() {
    const alertType = useAlertTypeState();
    
    return {
        alertType,
    };
}