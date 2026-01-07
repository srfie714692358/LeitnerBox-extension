import type { DictionaryEntry } from "@/types/providers";

export interface ApiOptions {
	word: string;
	providerId: string;
	apiKey?: string;
}

export interface ApiResult {
	status: number;
	data?: DictionaryEntry[];
	error?: string;
}
