import React from 'react';
import { ToastConfig, ToastConfigParams } from "react-native-toast-message"
import ToastMessage from './ToastMessage';

export const ToastMessageConfig: ToastConfig = {
    info: ({ text1, text2 }: ToastConfigParams<any>) => (
        <ToastMessage
            type={'info'}
            text1={text1}
            text2={text2}
        />
    ),
    aviso: ({ text1, text2 }: ToastConfigParams<any>) => (
        <ToastMessage
            type={'aviso'}
            text1={text1}
            text2={text2}
        />
    ),
    sucesso: ({ text1, text2 }: ToastConfigParams<any>) => (
        <ToastMessage
            type={'successo'}
            text1={text1}
            text2={text2}
        />
    ),
    erro: ({ text1, text2 }: ToastConfigParams<any>) => (
        <ToastMessage
            type={'erro'}
            text1={text1}
            text2={text2}
        />
    )
}