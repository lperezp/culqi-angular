export interface ICulqi {
    settings: ICulqiSettings;
}

export interface ICulqiSettings {
    title: string;
    currency: string;
    amount: number;
    order: string;
    xculqirsaid: string;
    rsapublickey: string;
}

export interface ICulqiOptions {
    lang?: string;
    installments?: boolean;
    paymentMethods?: PaymentMethods;
    style?: Style
}

export interface PaymentMethods {
    tarjeta: boolean;
    yape: boolean;
    bancaMovil: boolean;
    agente: boolean;
    billetera: boolean;
    cuotealo: boolean;
}

export interface Style {
    logo: string;
    bannerColor?: string;
    buttonBackground?: string;
    menuColor?: string;
    linksColor?: string;
    buttonText?: string;
    buttonTextColor?: string;
    priceColor?: string;
}

export interface IGetOptions {
    customButton: string;
    head: boolean;
    installments: boolean;
    lang: string;
    modal: boolean;
    onlyInputs: boolean;
    style: object;
}

export interface IGetSettings {
    amount: number;
    currency: string;
    description: string;
    title: string;
    version: number;
}

export interface IPaymentEvent {
    bubbles: boolean;
    cancelBubble: boolean;
    cancelable: boolean;
    composed: boolean;
    currentTarget: null;
    defaultPrevented: boolean;
    detail: string;
    eventPhase: number;
    isTrusted: boolean;
    path: any[];
    returnValue: boolean;
    srcElement: any;
    target: any;
    timeStamp: number;
    type: string;
}