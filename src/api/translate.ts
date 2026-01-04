// src/api/translate.ts
import axios, { type AxiosError } from "axios";
import { TRANSLATE_PROVIDERS } from "../config/providers";
import type { Options, Result } from "@/types/translateAPI";

export async function fetchTranslation(options: Options, signal?: AbortSignal): Promise<Result> {
	const provider = TRANSLATE_PROVIDERS.find((p) => p.id === options.providerId);
	if (!provider) return { status: 404, error: `Provider "${options.providerId}" not found.` };
	if (provider.requiresKey && !options.apiKey) return { status: 401, error: `API Key required for ${provider.name}.` };

	try {
		const response = await axios({
			url: provider.url,
			method: provider.method,
			signal,
			...provider.configurator(options.text, options.sourceLang, options.targetLang, options.apiKey),
		});
		return { status: response.status, data: provider.extractor(response.data) };
	} catch (err: unknown) {
        
		if (axios.isCancel(err)) return { status: 0, error: "Aborted" };
		const axiosError = err as AxiosError<{ message?: string }>;
		return {
			status: axiosError.response?.status || 500,
			error: axiosError.response?.data?.message || axiosError.message || "Translation failed",
		};
	}
}
