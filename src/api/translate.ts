import { fetchGeneric } from "./fetchGeneric";
import { TRANSLATE_PROVIDERS } from "@/config/providers";
import type { Options, Result } from "@/types/translateAPI";

export async function fetchTranslation(options: Options, signal?: AbortSignal): Promise<Result> {
	return fetchGeneric(
		TRANSLATE_PROVIDERS,
		{
			providerId: options.providerId,
			apiKey: options.apiKey,
			configInput: {
				text: options.text,
				sourceLang: options.sourceLang,
				targetLang: options.targetLang,
			},
		},
		signal
	);
}
