/* eslint-disable @typescript-eslint/no-unused-vars */
chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
	if (message.type === "TEXT_SELECTED") {
		// Show a visual indicator on the extension icon
		chrome.action.setBadgeText({ text: "!" });
		chrome.action.setBadgeBackgroundColor({ color: "#4CAF50" }); // Green
		chrome.action.setTitle({ title: "Click to see selected text" });
	} else if (message.type === "TEXT_CLEARED") {
		// Clear the indicator
		chrome.action.setBadgeText({ text: "" });
		chrome.action.setTitle({ title: "" });
	}
});
