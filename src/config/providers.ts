// src/config/providers.ts
import type { Translate } from "@/types/providers";

export const TRANSLATE_PROVIDERS: Translate[] = [
	{
		id: "mymemory",
		name: "MyMemory (Free)",
		url: "https://api.mymemory.translated.net/get",
		requiresKey: false,
		method: "GET",
		extractor: (v) => {
			const data = v as { responseData: { translatedText: string } };
			return data?.responseData?.translatedText || "";
		},
		configurator: (text, sourceLang, targetLang, apiKey) => ({
			params: {
				q: text,
				langpair: `${sourceLang}|${targetLang}`,
				...(apiKey ? { key: apiKey } : {}),
			},
		}),
	},
	{
		id: "libre",
		name: "LibreTranslate",
		url: "https://libretranslate.de/translate",
		requiresKey: false,
		method: "POST",
		extractor: (v) => {
			const data = v as { translatedText: string };
			return data?.translatedText || "";
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		configurator: (text, sourceLang, targetLang, _apiKey) => ({
			headers: {
				"Content-Type": "application/json",
			},
			data: {
				q: text,
				source: sourceLang,
				target: targetLang,
				format: "text",
			},
		}),
	},
	{
		id: "google",
		name: "Google Translate",
		url: "https://translation.googleapis.com/language/translate/v2",
		requiresKey: true,
		method: "POST",
		extractor: (v) => {
			const data = v as { data: { translations: Array<{ translatedText: string }> } };
			return data?.data?.translations?.[0]?.translatedText || "";
		},
		configurator: (text, sourceLang, targetLang, apiKey) => ({
			headers: {
				"Content-Type": "application/json",
			},
			data: {
				q: text,
				source: sourceLang,
				target: targetLang,
				format: "text",
				key: apiKey, // Google typically expects the key in the body for simple implementations
			},
		}),
	},
	{
		id: "deepl",
		name: "DeepL",
		url: "https://api-free.deepl.com/v2/translate",
		requiresKey: true,
		method: "POST",
		extractor: (v) => {
			const data = v as { translations: Array<{ text: string }> };
			return data?.translations?.[0]?.text || "";
		},
		configurator: (text, sourceLang, targetLang, apiKey) => ({
			headers: {
				Authorization: `DeepL-Auth-Key ${apiKey}`,
				"Content-Type": "application/json",
			},
			data: {
				text: [text], // DeepL expects an array of texts
				source_lang: sourceLang.toUpperCase(), // DeepL requires uppercase (e.g., EN, ES)
				target_lang: targetLang.toUpperCase(),
			},
		}),
	},
];

export const DEFAULT_PROVIDER_ID = "mymemory";
