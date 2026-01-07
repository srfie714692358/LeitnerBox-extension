import { useMemo } from "react";
import { useApiFetch } from "@/hooks/useApiFetch";
import { fetchTranslation } from "@/api/translate";
import { DEFAULT_TRANSLATE_PROVIDER_ID } from "@/config/providers";
import type { HookResult, WordPair } from "@/types/translate";

const SEPARATOR = " ||-|| ";

function parseResult(sourceText: string, response: string | null) {
	if (!response) return { translatedText: "", wordPairs: [] };

	const [fullText, listText] = response.split(SEPARATOR);
	const sourceWords = sourceText.trim().split(" ");
	const targetWords = listText.trim().split("\n");

	const seen = new Set<string>();
	const wordPairs: WordPair[] = [];

	sourceWords.forEach((word, idx) => {
		const key = word.toLowerCase();
		if (key && !seen.has(key)) {
			seen.add(key);
			wordPairs.push({
				word,
				translation: targetWords[idx] || "",
			});
		}
	});

	return { translatedText: fullText, wordPairs };
}

function useTranslate(text: string): HookResult {
	const fetchOptions = useMemo(
		() => ({
			text: `${text}${SEPARATOR}${text.replaceAll(" ", "\n")}`,
			sourceLang: "en",
			targetLang: "fa",
			providerId: DEFAULT_TRANSLATE_PROVIDER_ID,
		}),
		[text]
	);

	const { data, loading, error } = useApiFetch(fetchTranslation, fetchOptions);
	const result = useMemo(() => parseResult(text, data), [data, text]);

	return {
		loading,
		error,
		translatedText: result.translatedText,
		wordPairs: result.wordPairs,
	};
}

export default useTranslate;
