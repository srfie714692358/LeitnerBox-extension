/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DictionaryConfigInput } from "@/types/providers";
import type { AxiosRequestConfig } from "axios";

export const freeDictionaryConfigurator = (input: DictionaryConfigInput, _apiKey?: string): Partial<AxiosRequestConfig> => {
	const { word } = input;
	return {
		url: `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`,
	};
};

export const urbanDictionaryConfigurator = (input: DictionaryConfigInput, _apiKey?: string): Partial<AxiosRequestConfig> => {
	const { word } = input;
	return {
		params: {
			term: word,
		},
	};
};
