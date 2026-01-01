import type { StorageLocal, Message } from "../types/storage";

const handleSelection = () => {
	// If user select something, get it and save it in extension's storage and send the message to background.
	const selected = window.getSelection()?.toString();
	if (selected) {
		chrome.storage.local.set<StorageLocal>({ selectedText: selected }, () => {
			chrome.runtime.sendMessage<Message>({ type: "TEXT_SELECTED" });
		});
	} else {
		chrome.runtime.sendMessage<Message>({ type: "TEXT_CLEARED" });
	}
};

const init = () => {
	document.addEventListener("mouseup", handleSelection);
};

init();
