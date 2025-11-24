const backendUrl = import.meta.env.VITE_BACKEND_URL;
const baseUrl = `${backendUrl}openai/`;
import type { ChatMessage } from '@/types/chat';
import type { Movie } from '@/types/movie';

const fetchWithTimeout = async (url: string, options = {}, timeout = 30000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout - server did not respond in time');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

const getResponse = async (userMessage: ChatMessage, likedMovies: Movie[]) => {
// exit early if no user message
if (!userMessage || userMessage.content.trim() === '') {
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

const response = await fetchWithTimeout(`${baseUrl}response`, {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({input, instructions}),
}, 30000); // 30 second timeout for AI responses

if (!response.ok) {
	throw new Error(`AI Chat API Error: ${response.status} ${response.statusText}`);
}

const data = await response.json();
return {
	sender: 'agent',
	message: data.output_text
};
};

// exporting as an object to normalize usage with other services
const agentService = {
  getResponse,
};

export default agentService;
