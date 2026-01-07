import useStorageLocalGet from "@/hooks/useStorageLocalGet";
import useTranslate from "@/hooks/translate";

import { Card, CardContent } from "@/components/ui/card";
import EmptyState from "./components/emptyState";
import MaximumAlert from "./components/maximumAlert";
import Translation from "./components/translation";
import Definitions from "./components/definitions";

function Popup() {
	const selectedText = useStorageLocalGet("selectedText");
	const reachedMax = selectedText?.length && selectedText?.length < 500;
	const translate = useTranslate(reachedMax ? selectedText : "Your selected text is more than 500 chars");

	return (
		<Card className="border-none shadow-none w-125 p-0">
			<CardContent className="p-0">{!selectedText && <EmptyState />}</CardContent>
			<CardContent>{selectedText && !reachedMax && <MaximumAlert />}</CardContent>
			{selectedText && reachedMax && (
				<>
					<CardContent className="p-3">
						<Translation translate={translate} />
					</CardContent>
					<CardContent className="p-3">
						<Definitions translate={translate} />
					</CardContent>
				</>
			)}
		</Card>
	);
}

export default Popup;
