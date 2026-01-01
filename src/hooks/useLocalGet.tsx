import { useEffect, useState } from "react";
import type { Message, StorageLocal } from "../types/storage";

function useLocalGet(key: keyof StorageLocal) {
	const [value, setValue] = useState<string | null>(null);
	useEffect(() => {
		chrome.runtime.sendMessage<Message>({ type: "TEXT_CLEARED" });

		chrome.storage.local.get<StorageLocal>([key], (result) => {
			if (result.selectedText) {
				setValue(result.selectedText);
				chrome.storage.local.remove(["selectedText"]);
			}
		});
	}, [key]);
	return value;
}

export default useLocalGet;
