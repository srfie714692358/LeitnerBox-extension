export interface ApiOptions {
    text: string;
    sourceLang: string;
    targetLang: string;
    providerId: string;
    apiKey?: string;
}

export interface ApiResult {
    status: number;
    data?: string;
    error?: string;
}

export interface WordPair {
    word: string;
    translation: string;
}

export interface HookResult {
    loading: boolean;
    error: string | null;
    translatedText: string;
    wordPairs: WordPair[];
}