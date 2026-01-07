import type { Definition, DictionaryEntry, Meaning } from "@/types/providers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Volume2 } from "lucide-react";

function DefinitionDetails({ entry, selectedText }: { entry: DictionaryEntry; selectedText: string }) {
	return (
		<Card className="mb-6 last:mb-0 overflow-hidden">
			<CardHeader className="pb-3">
				<div className="flex items-center justify-between gap-2">
					<CardTitle className="text-xl capitalize">{entry.word || selectedText}</CardTitle>
					{entry.audio && (
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 text-muted-foreground hover:text-primary"
							onClick={() => new Audio(entry.audio).play()}
						>
							<Volume2 className="h-4 w-4" />
						</Button>
					)}
				</div>
				{entry.phonetic && <CardDescription className="italic text-sm">{entry.phonetic}</CardDescription>}
			</CardHeader>

			<CardContent>
				{entry.meanings?.map((meaning: Meaning, mIdx: number) => (
					<div key={mIdx}>
						<Badge variant="secondary" className="mb-3 font-normal">
							{meaning.partOfSpeech}
						</Badge>
						<ul className="space-y-4 mb-6 last:mb-0">
							{meaning.definitions?.map((def: Definition, dIdx: number) => (
								<li key={dIdx} className="text-sm leading-relaxed">
									<p className="text-foreground">{def.definition}</p>
									{def.example && <p className="mt-1 text-xs text-muted-foreground italic">"{def.example}"</p>}
									{def.synonyms && def.synonyms.length > 0 && (
										<div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
											<span className="text-xs font-semibold text-muted-foreground">Synonyms:</span>
											{def.synonyms.slice(0, 3).map((syn: string, sIdx: number) => (
												<span
													key={sIdx}
													className="text-xs text-primary hover:underline cursor-pointer transition-colors"
												>
													{syn}
													{sIdx < def.synonyms!.length - 1 && ","}
												</span>
											))}
										</div>
									)}
								</li>
							))}
						</ul>
						{mIdx !== (entry.meanings?.length || 0) - 1 && <Separator className="my-4" />}
					</div>
				))}
			</CardContent>
		</Card>
	);
}

export default DefinitionDetails;
