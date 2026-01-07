import { useEffect, useState } from "react";
import type { Message, StorageLocal } from "../types/storage";

function useStorageLocalGet(key: keyof StorageLocal) {
	const [value, setValue] = useState<string | null>(null);
	useEffect(() => {
		chrome.runtime.sendMessage<Message>({ type: "TEXT_CLEARED" });

		chrome.storage.local.get<StorageLocal>([key], (result) => {
			const storedValue = result[key];
			if (storedValue) {
				setValue(storedValue);
				chrome.storage.local.remove([key]);
			} else {
				console.log("No text found for key:", key);
			}
		});
	}, [key]);
	return value;
}

export default useStorageLocalGet;
