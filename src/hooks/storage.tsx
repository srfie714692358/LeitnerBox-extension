import { useState, useEffect } from "react";
import { load, save } from "@/utils/storage";

export const useStorage = ({ key, action, value }: { key: string; action: "load" | "save"; value: unknown }) => {
	const [processing, setProcessing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<unknown | null>(null);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setProcessing(true);
		if (action === "save") {
			save(key, value)
				.catch((err) => setError(err))
				.finally(() => setProcessing(false));
		} else if (action === "load") {
			load(key)
				.then((res) => setData(res))
				.catch((err) => setError(err))
				.finally(() => setProcessing(false));
		}
	}, [key, action, value]);

	return { processing, error, data };
};
