import { fetchGeneric } from "./fetchGeneric";
import { DICTIONARY_PROVIDERS } from "@/config/providers";
import type { Options, Result } from "@/types/dictionaryAPI";

export async function fetchDefinition(options: Options, signal?: AbortSignal): Promise<Result> {
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
