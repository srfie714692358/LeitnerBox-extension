import type { DictionaryEntry } from "@/types/providers";

export interface Options {
	word: string;
	providerId: string;
	apiKey?: string;
}

export interface Result {
	status: number;
	data?: DictionaryEntry[];
	error?: string;
}
