import type { Dictionary, DictionaryEntry, Meaning, Definition } from "@/types/providers";

interface FreeDictItem {
	word: string;
	phonetic?: string;
	phonetics?: Array<{ audio?: string }>;
	meanings: Array<{
		partOfSpeech: string;
		definitions: Array<{ definition: string; example?: string; synonyms?: string[] }>;
	}>;
}

interface UrbanDictItem {
	definition: string;
	example?: string;
	thumbs_up: number;
}

interface UrbanDictResponse {
	list: UrbanDictItem[];
}

export const freeDictionaryExtractor: Dictionary["extractor"] = (v) => {
	const data = v as FreeDictItem[];
	return data.map((entry): DictionaryEntry => {
		const audioLink = entry.phonetics?.find((p) => p.audio)?.audio;
		return {
			word: entry.word,
			phonetic: entry.phonetic,
			audio: audioLink,
			meanings: entry.meanings.map(
				(m): Meaning => ({
					partOfSpeech: m.partOfSpeech,
					definitions: m.definitions.map(
						(d): Definition => ({
							definition: d.definition,
							example: d.example,
							synonyms: d.synonyms,
						})
					),
				})
			),
		};
	});
};

export const urbanDictionaryExtractor: Dictionary["extractor"] = (v) => {
	const data = v as UrbanDictResponse;
	if (!data.list || data.list.length === 0) return [];

	return [
		{
			word: "",
			phonetic: undefined,
			meanings: [
				{
					partOfSpeech: "Slang",
					definitions: data.list.map(
						(item): Definition => ({
							definition: item.definition,
							example: item.example,
							tags: [`👍 ${item.thumbs_up}`],
						})
					),
				},
			],
		},
	];
};
