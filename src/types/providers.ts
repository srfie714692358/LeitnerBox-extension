import type { AxiosRequestConfig } from "axios";

export interface Translate {
	id: string;
	name: string;
	url: string;
	requiresKey: boolean;
	method: "GET" | "POST";

	// Extracts the text from the API response
	extractor: (v: unknown) => string;

	// Handles the specific request structure for each API
	configurator: (
		text: string,
		sourceLang: string,
		targetLang: string,
		apiKey?: string
	) => Pick<AxiosRequestConfig, "headers" | "params" | "data">;
}
