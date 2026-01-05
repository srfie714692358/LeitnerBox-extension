import type { TranslateConfigInput } from "@/types/providers";
import type { AxiosRequestConfig } from "axios";

export const myMemoryConfigurator = (input: TranslateConfigInput, apiKey?: string): Partial<AxiosRequestConfig> => {
	const { text, sourceLang, targetLang } = input;
	return {
		params: {
			q: text,
			langpair: `${sourceLang}|${targetLang}`,
			...(apiKey ? { key: apiKey } : {}),
		},
	};
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const libreConfigurator = (input: TranslateConfigInput, _apiKey?: string): Partial<AxiosRequestConfig> => {
	const { text, sourceLang, targetLang } = input;
	return {
		headers: { "Content-Type": "application/json" },
		data: {
			q: text,
			source: sourceLang,
			target: targetLang,
			format: "text",
		},
	};
};

export const googleConfigurator = (input: TranslateConfigInput, apiKey?: string): Partial<AxiosRequestConfig> => {
	const { text, sourceLang, targetLang } = input;
	return {
		headers: { "Content-Type": "application/json" },
		data: {
			q: text,
			source: sourceLang,
			target: targetLang,
			format: "text",
			key: apiKey,
		},
	};
};

export const deepLConfigurator = (input: TranslateConfigInput, apiKey?: string): Partial<AxiosRequestConfig> => {
	const { text, sourceLang, targetLang } = input;
	return {
		headers: {
			Authorization: `DeepL-Auth-Key ${apiKey}`,
			"Content-Type": "application/json",
		},
		data: {
			text: [text],
			source_lang: sourceLang.toUpperCase(),
			target_lang: targetLang.toUpperCase(),
		},
	};
};
