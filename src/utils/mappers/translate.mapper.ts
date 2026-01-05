import type { Translate } from "@/types/providers";

interface MyMemoryResponse {
	responseData: { translatedText: string };
}

interface LibreResponse {
	translatedText: string;
}

interface GoogleResponse {
	data: { translations: Array<{ translatedText: string }> };
}

interface DeepLResponse {
	translations: Array<{ text: string }>;
}

export const myMemoryExtractor: Translate["extractor"] = (v) => {
	const data = v as MyMemoryResponse;
	return data?.responseData?.translatedText || "";
};

export const libreExtractor: Translate["extractor"] = (v) => {
	const data = v as LibreResponse;
	return data?.translatedText || "";
};

export const googleExtractor: Translate["extractor"] = (v) => {
	const data = v as GoogleResponse;
	return data?.data?.translations?.[0]?.translatedText || "";
};

export const deepLExtractor: Translate["extractor"] = (v) => {
	const data = v as DeepLResponse;
	return data?.translations?.[0]?.text || "";
};
