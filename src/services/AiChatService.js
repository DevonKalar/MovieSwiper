import OpenAI from "openai";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
});

async function getAgentResponse(userMessage) {
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
            input: `Answer the following message as a movie aficionado for the company MovieSwiper. Provide a concise and informative response, without markdown formatting or mentioning the information before the client message. client Message: ${userMessage}`
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
