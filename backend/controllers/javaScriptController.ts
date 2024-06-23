export const javaScriptController = (code: any) => {
	const logs: any[] = []; // Array to store console.log outputs

	const originalLog = console.log;
	console.log = function (...value) {
		originalLog.apply(console, value);
		logs.push(value); // Store console.log output in the logs array
		return value;
	};

	try {
		// Execute the code
		eval(code);

		// Restore original console.log function
		console.log = originalLog;

		return logs; // Return array containing all console.log outputs
	} catch (error: any) {
		console.log(error);
		return []; // Return an empty array if an error occurs
	}
};
