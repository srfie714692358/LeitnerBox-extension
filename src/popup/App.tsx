import { useMemo } from "react";
import useStorageLocalGet from "@/hooks/useStorageLocalGet";
import { Loader } from "lucide-react";
import { useTranslate } from "@/hooks/useTranslate";
import { DEFAULT_PROVIDER_ID } from "@/config/providers";

function App() {
	const selectedText = useStorageLocalGet("selectedText");
	const translateOptions = useMemo(
		() => ({
			text: selectedText || "Ok.",
			sourceLang: "en",
			targetLang: "fa",
			providerId: DEFAULT_PROVIDER_ID,
		}),
		[selectedText]
	);
	const { loading, error, translation } = useTranslate(translateOptions);
	console.log(loading);

	return (
		<div className="w-80 p-6 bg-gray-900 text-white rounded-xl shadow-lg">
			<p className="p-2 border border-gray-700 rounded-lg my-2 w-full text-center text-gray-100 min-h-10">
				{loading && <Loader className="animate-spin duration-700 mx-auto" />}
				{error}
				{translation}
			</p>
		</div>
	);
}

export default App;
