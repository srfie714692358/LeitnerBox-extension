import type { AxiosRequestConfig } from "axios";

export interface BaseProvider<TConfigInput, TResult> {
	id: string;
	name: string;
	url: string;
	requiresKey: boolean;
	method: "GET" | "POST";
	configurator: (input: TConfigInput, apiKey?: string) => Partial<AxiosRequestConfig>;
	extractor: (response: unknown) => TResult;
}

export interface TranslateConfigInput {
	text: string;
	sourceLang: string;
	targetLang: string;
}

export interface DictionaryConfigInput {
	word: string;
}

export interface Definition {
	definition: string;
	example?: string;
	synonyms?: string[];
	tags?: string[]; // For Urban Dictionary likes/votes or other metadata
}

export interface Meaning {
	partOfSpeech: string;
	definitions: Definition[];
}

export interface DictionaryEntry {
	word: string;
	phonetic?: string;
	audio?: string; // URL to pronunciation audio
	meanings: Meaning[];
}

export type Translate = BaseProvider<TranslateConfigInput, string>;
export type Dictionary = BaseProvider<DictionaryConfigInput, DictionaryEntry[]>;
