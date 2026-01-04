// src/hooks/useTranslate.ts
import { fetchTranslation } from "../api/translate";
import type { Options } from "@/types/translateAPI";
import { useEffect, useState, useRef } from "react";

/**
 * Fetches translation based on input text and language settings.
 * Automatically aborts previous requests when inputs change (using AbortController).
 * Returns loading state, error (if any), and the extracted translated string.
 */
export const useTranslate = (options: Options) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [translation, setTranslation] = useState<string | null>(null);
	const controllerRef = useRef<AbortController | null>(null);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setTranslation(null);
		setLoading(false);
		setError(null);
		controllerRef.current?.abort();

		if (!options.text?.trim()) return;

		const controller = new AbortController();
		controllerRef.current = controller;
		setLoading(true);

		fetchTranslation(options, controller.signal)
			.then((res) => {
				if (controller.signal.aborted) return;

				if (res.status >= 200 && res.status < 300) {
					setTranslation(res.data || null);
				} else {
					setError(res.error || "Failed to translate text");
				}
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message || "Failed to translate text");
				setLoading(false);
			});

		return () => controller.abort();
	}, [options]);

	return { loading, error, translation };
};
