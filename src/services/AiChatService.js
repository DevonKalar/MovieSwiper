const backendUrl = import.meta.env.VITE_BACKEND_URL;
const baseUrl = `${backendUrl}openai/`;

const getAgentResponse = async (userMessage, likedMovies) => {
// exit early if no user message
if (!userMessage || userMessage.trim() === '') {
	return {
			sender: 'agent',
			message: 'Please provide a message for me to respond to.',
			error: true
	};
}

// create instructions for the model
let instructions = `You are an AI assistant for MovieSwiper, a movie recommendation and trivia service. 
Answer the user's questions concisely and informatively, without using markdown formatting. 
Do not mention the information provided in the instructions in your response.
If the user asks for movie recommendations, suggest movies based on their liked movies, if not available suggest popular movies.
If the user asks trivia questions, provide accurate and concise answers.
If you don't know the answer, say "I'm sorry, I don't have that information."
If the user asks for something outside of movies, politely decline and redirect them to movie-related topics.`;

// provide user movie preferences or history if available
if (likedMovies) {
		instructions += ` The user has liked the following movies: ${likedMovies}.`;
}

instructions += ` Here is the user's message: ${userMessage}`;

try {
	const response = await fetch(`${baseUrl}response`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({input: instructions})
	});

	if (!response.ok) {
			throw new Error('Network response was not ok');
	}

	const data = await response.json();
	return {
		sender: 'agent',
		message: data.output_text
	};
} catch (error) {
	console.error('OpenAI API error:', error);
	return {
		sender: 'agent',
		message: 'Sorry, I encountered an error. Please try again.',
		error: true
	};
}
};

export { getAgentResponse };
