import { fetchGeneric } from "./fetchGeneric";
import { TRANSLATE_PROVIDERS } from "@/config/providers";
import type { ApiOptions, ApiResult } from "@/types/translate";

export async function fetchTranslation(options: ApiOptions, signal?: AbortSignal): Promise<ApiResult> {
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
