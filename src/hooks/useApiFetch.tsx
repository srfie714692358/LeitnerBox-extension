/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState, useRef } from "react";

/**
 * A generic hook to fetch data from an API.
 * Handles loading, errors, and automatic abortion of previous requests.
 *
 * @param fetchFn - The API function to call (e.g., fetchTranslation)
 * @param options - The options object for the API
 * @param condition - (Optional) A function to determine if the fetch should run based on options.
 */
export function useApiFetch<TOptions, TResult>(
	fetchFn: (options: TOptions, signal?: AbortSignal) => Promise<{ status: number; data?: TResult; error?: string }>,
	options: TOptions
) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<TResult | null>(null);
	const controllerRef = useRef<AbortController | null>(null);

	useEffect(() => {
		setData(null);
		setError(null);
		controllerRef.current?.abort();

		const controller = new AbortController();
		controllerRef.current = controller;
		setLoading(true);

		fetchFn(options, controller.signal)
			.then((res) => {
				if (controller.signal.aborted) return;

				if (res.status >= 200 && res.status < 300) {
					setData(res.data || null);
				} else {
					setError(res.error || "Request failed");
				}
			})
			.catch((err) => setError(err.message || "An unexpected error occurred"))
			.finally(() => {
				if (!controller.signal.aborted) {
					setLoading(false);
				}
			});

		return () => controller.abort();
	}, [options, fetchFn]);

	return { loading, error, data };
}
