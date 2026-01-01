import useLocalGet from "../hooks/useLocalGet";

function App() {
	const selectedText = useLocalGet("selectedText");

	console.log("rendering ...");
	return (
		<div className="w-80 p-6 bg-gray-900 text-white rounded-xl shadow-lg">
			<p className="p-2 border border-gray-700 rounded-lg my-2 w-full text-center text-gray-100">
				{selectedText || "No text selected"}
			</p>
		</div>
	);
}

export default App;
