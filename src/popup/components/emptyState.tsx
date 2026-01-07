import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Box } from "lucide-react";

function EmptyState() {
	return (
		<Empty className="w-full">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<Box className="text-blue-500 w-12 h-12" />
				</EmptyMedia>
				<EmptyTitle>Leitner Box</EmptyTitle>
				<EmptyDescription>Select text to start learning words.</EmptyDescription>
			</EmptyHeader>
		</Empty>
	);
}

export default EmptyState;
