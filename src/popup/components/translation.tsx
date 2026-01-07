import type { HookResult } from "@/types/translate";
import { Loader } from "lucide-react";

function Translation({ translate }: { translate: HookResult }) {
	return (
		<>
			{translate.loading && <Loader className="h-7 w-7 animate-spin text-muted-foreground mx-auto" />}
			{translate.error && <span className="text-destructive text-xs font-medium">{translate.error}</span>}
			{!translate.loading && !translate.error && (
				<div className="text-sm font-medium text-justify text-muted-foreground border rounded-sm p-3" dir="rtl">
					{translate.translatedText}
				</div>
			)}
		</>
	);
}

export default Translation;
