import { useMemo } from "react";
import useStorageLocalGet from "@/hooks/useStorageLocalGet";
import { Loader, Volume2 } from "lucide-react";
import { DEFAULT_TRANSLATE_PROVIDER_ID, DEFAULT_DICTIONARY_PROVIDER_ID } from "@/config/providers";
import { fetchTranslation } from "@/api/translate";
import { useApiFetch } from "@/hooks/useApiFetch";
import { fetchDefinition } from "@/api/dictionary";

function Popup() {
	const selectedText = useStorageLocalGet("selectedText");
	const translateOptions = useMemo(
		() => ({
			text: selectedText || "",
			sourceLang: "en",
			targetLang: "fa",
			providerId: DEFAULT_TRANSLATE_PROVIDER_ID,
		}),
		[selectedText]
	);

	const translate = useApiFetch(fetchTranslation, translateOptions);

	const dictOptions = useMemo(
		() => ({
			word: selectedText || "",
			providerId: DEFAULT_DICTIONARY_PROVIDER_ID,
		}),
		[selectedText]
	);

	const definition = useApiFetch(fetchDefinition, dictOptions);

	return (
		<div className="w-80 p-6 bg-gray-900 text-white rounded-xl shadow-lg">
			<div className="p-2 border border-gray-700 rounded-lg my-2 w-full text-center text-gray-100 min-h-10">
				{translate.loading && <Loader className="animate-spin duration-700 mx-auto" />}
				{translate.error && <span className="text-red-400 text-sm">{translate.error}</span>}
				{!translate.loading && !translate.error && !translate.data && (
					<span className="text-gray-500">Select text to translate...</span>
				)}
				{translate.data && <span dir="rtl">{translate.data}</span>}
			</div>

			<div className="p-4 border rounded-lg shadow text-white">
				{definition.loading && <Loader className="animate-spin duration-700 mx-auto" />}
				{definition.error && <p className="text-red-500">{definition.error}</p>}
				{definition.data &&
					definition.data.map((entry, idx) => (
						<div key={idx} className="mb-4 border-b pb-4 last:border-0">
							<div className="flex flex-wrap items-center justify-between mb-2">
								<h1 className="text-2xl font-bold capitalize">{entry.word || selectedText || ""}</h1>
								{entry.phonetic && <span className="text-gray-500 text-sm italic">{entry.phonetic}</span>}
								{entry.audio && (
									<button
										onClick={() => new Audio(entry.audio).play()}
										className="p-2 hover:bg-gray-300 rounded-full"
									>
										<Volume2 className="w-5 h-5 text-blue-600" />
									</button>
								)}
							</div>

							{entry.meanings.map((meaning, mIdx) => (
								<div key={mIdx} className="mt-2">
									<h3 className="font-bold text-base text-purple-700 capitalize">{meaning.partOfSpeech}</h3>
									<ul className="list-disc list-inside mt-1 space-y-2">
										{meaning.definitions.map((def, dIdx) => (
											<li key={dIdx} className="text-sm text-gray-300">
												<span>{def.definition}</span>
												{def.example && (
													<div className="mt-1 text-xs text-gray-500 italic">
														Example: {def.example}
													</div>
												)}
												{def.synonyms && def.synonyms.length > 0 && (
													<div className="mt-1 text-xs text-blue-600">
														Synonyms: {def.synonyms.join(", ")}
													</div>
												)}
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					))}
			</div>
		</div>
	);
}

export default Popup;
