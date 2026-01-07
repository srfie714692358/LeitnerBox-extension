import { AlertTriangle } from "lucide-react";

function MaximumAlert() {
	return (
		<div className="w-full min-h-40 flex flex-col items-center py-3">
			<AlertTriangle className="text-red-500 w-12 h-12 bg-muted p-1 rounded-sm mb-2" />
			<h3 className="font-medium text-lg">Leitner Box</h3>
			<span className="font-normal text-sm text-muted-foreground">Your text is too long, please choose a shorter one.</span>
		</div>
	);
}

export default MaximumAlert;
