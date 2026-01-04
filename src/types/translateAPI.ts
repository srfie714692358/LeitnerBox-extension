export interface Options {
    text: string;
    sourceLang: string;
    targetLang: string;
    providerId: string;
    apiKey?: string;
}

export interface Result {
    status: number;
    data?: string;
    error?: string;
}