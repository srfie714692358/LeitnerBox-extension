import type { Translate, Dictionary } from "@/types/providers";
import { myMemoryExtractor, libreExtractor, googleExtractor, deepLExtractor } from "@/utils/mappers/translate.mapper";
import {
	myMemoryConfigurator,
	libreConfigurator,
	googleConfigurator,
	deepLConfigurator,
} from "@/utils/builders/translate.builder";

import { freeDictionaryExtractor, urbanDictionaryExtractor } from "@/utils/mappers/dictionary.mapper";
import { freeDictionaryConfigurator, urbanDictionaryConfigurator } from "@/utils/builders/dictionary.builder";

export const TRANSLATE_PROVIDERS: Translate[] = [
	{
		id: "mymemory",
		name: "MyMemory (Free)",
		url: "https://api.mymemory.translated.net/get",
		requiresKey: false,
		method: "GET",
		extractor: myMemoryExtractor,
		configurator: myMemoryConfigurator,
	},
	{
		id: "libre",
		name: "LibreTranslate",
		url: "https://libretranslate.de/translate",
		requiresKey: false,
		method: "POST",
		extractor: libreExtractor,
		configurator: libreConfigurator,
	},
	{
		id: "google",
		name: "Google Translate",
		url: "https://translation.googleapis.com/language/translate/v2",
		requiresKey: true,
		method: "POST",
		extractor: googleExtractor,
		configurator: googleConfigurator,
	},
	{
		id: "deepl",
		name: "DeepL",
		url: "https://api-free.deepl.com/v2/translate",
		requiresKey: true,
		method: "POST",
		extractor: deepLExtractor,
		configurator: deepLConfigurator,
	},
];

export const DICTIONARY_PROVIDERS: Dictionary[] = [
	{
		id: "freedictionary",
		name: "Free Dictionary API",
		url: "https://api.dictionaryapi.dev/api/v2/entries/en/",
		requiresKey: false,
		method: "GET",
		extractor: freeDictionaryExtractor,
		configurator: freeDictionaryConfigurator,
	},
	{
		id: "urban",
		name: "Urban Dictionary",
		url: "https://api.urbandictionary.com/v0/define",
		requiresKey: false,
		method: "GET",
		extractor: urbanDictionaryExtractor,
		configurator: urbanDictionaryConfigurator,
	},
];

export const DEFAULT_TRANSLATE_PROVIDER_ID = "mymemory";
export const DEFAULT_DICTIONARY_PROVIDER_ID = "freedictionary";
