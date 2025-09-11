import OpenAI from "openai";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
});

async function getAgentResponse(userMessage, likedMovies) {
    // create prompt structure

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

    // call the OpenAI API
    if (!userMessage || userMessage.trim() === '') {
        return {
            sender: 'agent',
            message: 'Please provide a message for me to respond to.',
            error: true
        };
    }

    try {
        const response = await openai.responses.create({
            model: "gpt-4.1",
            input: `Instructions:
            ${instructions}
            Client Message:
            ${userMessage}`
        });

        console.log(response);
        return {
            sender: 'agent',
            message: response.output_text
        };
    } catch (error) {
        console.error('OpenAI API error:', error);
        return {
            sender: 'agent',
            message: 'Sorry, I encountered an error. Please try again.',
            error: true
        };
    }
}

export { getAgentResponse };
