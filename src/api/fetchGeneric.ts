import axios, { type AxiosError } from "axios";
import type { BaseProvider } from "@/types/providers";

export async function fetchGeneric<TConfigInput, TResult>(
	providers: BaseProvider<TConfigInput, TResult>[],
	options: {
		providerId: string;
		apiKey?: string;
		configInput: TConfigInput;
	},
	signal?: AbortSignal
): Promise<{ status: number; data?: TResult; error?: string }> {
	const provider = providers.find((p) => p.id === options.providerId);
	if (!provider) return { status: 404, error: `Provider "${options.providerId}" not found.` };
	if (provider.requiresKey && !options.apiKey) return { status: 401, error: `API Key required for ${provider.name}.` };

	try {
		const dynamicConfig = provider.configurator(options.configInput, options.apiKey);

		const response = await axios({
			url: dynamicConfig.url || provider.url,
			method: provider.method,
			signal,
			...dynamicConfig,
		});

		return { status: response.status, data: provider.extractor(response.data) };
	} catch (err: unknown) {
		if (axios.isCancel(err)) return { status: 0, error: "Aborted" };

		const axiosError = err as AxiosError<{ message?: string }>;
		return {
			status: axiosError.response?.status || 500,
			error: axiosError.response?.data?.message || axiosError.message || "Request failed",
		};
	}
}
