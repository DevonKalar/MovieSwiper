const backendUrl = import.meta.env.VITE_BACKEND_URL;
const baseUrl = `${backendUrl}openai/`;

const getAgentResponse = async (userMessage, likedMovies) => {
// exit early if no user message
if (!userMessage || userMessage.trim() === '') {
	throw new Error('Please provide a message for me to respond to.');
}

const input = `${userMessage}`;

// create instructions for the model
const instructions = `You are the movie aficionado, Movio! A user at MovieSwiper needs your help with all things movies. 
Answer the user's questions concisely and informatively, without using markdown formatting. 
If the user asks for movie recommendations, suggest movies based on their liked movies, if not available suggest popular movies.
If the user asks trivia questions, provide accurate and concise answers.
If you don't know the answer, say "I'm sorry, I don't have that information."
If the user asks for something outside of movies, politely decline and redirect them to movie-related topics.
The user has liked the following movies: ${likedMovies || 'none'}.`;

const response = await fetch(`${baseUrl}response`, {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({input, instructions}),
});

if (!response.ok) {
	throw new Error(`AI Chat API Error: ${response.status} ${response.statusText}`);
}

const data = await response.json();
return {
	sender: 'agent',
	message: data.output_text
};
};

export { getAgentResponse };
