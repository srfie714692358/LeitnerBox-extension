export const load = async (key: string) => {
	const result = chrome.storage.local.get(key);
	return result;
};

export const save = async (key: string, value: unknown) => {
	const result = load(key);
	chrome.storage.local.set({ ...result, [key]: value });
};

