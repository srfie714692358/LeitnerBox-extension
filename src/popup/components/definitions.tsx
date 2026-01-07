import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Loader } from "lucide-react";
import DefinitionDetails from "./definitionDetails";
import type { HookResult, WordPair } from "@/types/translate";
import { useApiFetch } from "@/hooks/useApiFetch";
import { fetchDefinition } from "@/api/dictionary";
import { DEFAULT_DICTIONARY_PROVIDER_ID } from "@/config/providers";
import { useMemo, useState } from "react";

function Definitions({ translate }: { translate: HookResult }) {
	const [theWord, setTheWord] = useState<WordPair>({ word: "", translation: "" });
	const dictOptions = useMemo(
		() => ({
			word: theWord.word || "",
			providerId: DEFAULT_DICTIONARY_PROVIDER_ID,
		}),
		[theWord.word]
	);
	const definition = useApiFetch(fetchDefinition, dictOptions);
	const handleAccordionChange = (value: string | undefined) => {
		if (!value) return;
		const index = parseInt(value.split("-")[1], 10);
		const word = translate.wordPairs[index];

		if (word) {
			setTheWord(word);
		}
	};
	return (
		<Accordion type="single" className="w-full space-y-1.5" onValueChange={handleAccordionChange}>
			{translate.wordPairs.map((pair: WordPair, idx: number) => (
				<AccordionItem key={idx} value={`item-${idx}`} className="border rounded-sm p-2">
					<AccordionTrigger className="py-3 px-0">
						<span className="font-semibold text-foreground mr-2">{pair.word}</span>
						<span className="text-muted-foreground text-sm">{pair.translation}</span>
					</AccordionTrigger>
					<AccordionContent className="p-4">
						{definition.loading ? (
							<div className="flex justify-center py-4">
								<Loader className="h-5 w-5 animate-spin text-muted-foreground" />
							</div>
						) : definition.error ? (
							<div className="text-destructive text-xs py-2">{definition.error}</div>
						) : definition.data && definition.data.length > 0 ? (
							<DefinitionDetails entry={definition.data[0]} selectedText={pair.word} />
						) : (
							<div className="text-sm text-muted-foreground italic py-2">No definition found.</div>
						)}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}

export default Definitions;
