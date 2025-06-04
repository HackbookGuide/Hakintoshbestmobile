const GeminiAPIManager = (() => {
    // Define the base URL for the Gemini API.
    // The specific model is gemini-2.0-flash, using the generateContent method.
    const GEMINI_API_URL_BASE = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;
    
    // The API_KEY will be an empty string. The Canvas environment automatically provides it
    // during the fetch call when the key is empty. Do not add any API key validation.
    const API_KEY = ""; 

    /**
     * Calls the Gemini API with a given prompt text.
     * @param {string} promptText - The text prompt to send to the Gemini API.
     * @returns {Promise<string>} A promise that resolves with the AI-generated text or an error message.
     */
    async function callGeminiAPI(promptText) {
        // Construct the chat history. For simple one-turn conversations,
        // it contains a single user message.
        const chatHistory = [{ role: "user", parts: [{ text: promptText }] }];
        const payload = { contents: chatHistory };

        try {
            // Perform the fetch request to the Gemini API.
            const response = await fetch(`${GEMINI_API_URL_BASE}?key=${API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            // Check if the HTTP response is not OK (e.g., 4xx or 5xx errors).
            if (!response.ok) {
                const errorBody = await response.text(); // Get more details from the error response body.
                console.error("Gemini API Error Response:", response.status, errorBody);
                // Throw an error that includes the status and message for better debugging.
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorBody}`);
            }

            // Parse the JSON response from the API.
            const result = await response.json();

            // Check the structure of the response to ensure it contains the expected data.
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0 &&
                typeof result.candidates[0].content.parts[0].text === 'string') {
                // Return the generated text from the first candidate.
                return result.candidates[0].content.parts[0].text;
            } else {
                // Log an error if the response structure is not as expected.
                console.error("Unexpected Gemini API response structure:", result);
                return "Error: Could not retrieve valid content from AI. The response structure was unexpected.";
            }
        } catch (error) {
            // Catch any errors during the fetch operation or JSON parsing.
            console.error("Error calling Gemini API:", error);
            // Return a user-friendly error message including details from the caught error.
            return `Error: Could not connect to AI. Details: ${error.message}`;
        }
    }

    // Expose the callGeminiAPI function as part of the module.
    return { 
        callGeminiAPI 
    };
})();
