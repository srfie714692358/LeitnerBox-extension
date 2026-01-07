import { fetchGeneric } from "./fetchGeneric";
import { DICTIONARY_PROVIDERS } from "@/config/providers";
import type { ApiOptions, ApiResult } from "@/types/dictionary";

export async function fetchDefinition(options: ApiOptions, signal?: AbortSignal): Promise<ApiResult> {
	return fetchGeneric(
		DICTIONARY_PROVIDERS,
		{
			providerId: options.providerId,
			apiKey: options.apiKey,
			configInput: { word: options.word },
		},
		signal
	);
}
