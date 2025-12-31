import { useState } from "react";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);
	return (
		<div className="w-80 p-6 bg-gray-900 text-white rounded-xl shadow-lg">
			<h1 className="text-2xl font-bold text-brand mb-4">Vite + CRXJS + v4</h1>
			<p className="text-gray-300 mb-4">This setup works natively with Vite.</p>
			<p>You can edit src/popup/App.tsx file.</p>
			<p className="p-2 border rounded-lg my-2 w-full text-center">Count: {count}</p>
			<button onClick={() => setCount(count + 1)} className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded transition w-full">
				Click Me
			</button>
		</div>
	);
}

export default App;
