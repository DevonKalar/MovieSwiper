import { useState, useEffect, useRef, useMemo } from 'react';
import { getAgentResponse } from '../../services/AiChatService.js';
import { useUser } from '@providers/useUser';
import movioProfilePic from '@images/ai-avatar.jpg';
import { ChatBotIcon } from '@icons';

export const AiChat = () => {
	const { likedMovies } = useUser();
	const movieTitles = useMemo(() => likedMovies.map(movie => movie.title).join(", "), [likedMovies]);

	const initialChatData = [{
		sender: 'agent',
		message: 'Hello, I\'m Movio! Here to chat about all things movies! Can I recommend a movie, or answer some trivia questions for you?'
	}];
	const [chatData, setChatData] = useState(initialChatData);
	const [userMessage, setUserMessage] = useState("");
	const [isAgentTyping, setIsAgentTyping] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// add user message to chat
		setChatData(prev => [...prev, { sender: 'user', message: userMessage }]);
		// clear input
		setUserMessage('');
		// get agent response
		setIsAgentTyping(true);
		
    try {
      const response = await getAgentResponse(userMessage, movieTitles);
      setChatData(prev => [...prev, response]);
    } catch (error) {
      setChatData(prev => [...prev, {
        sender: 'agent',
        message: error.message || 'Sorry, I encountered an error. Please send your message again.',
        error: true
      }]);
    } finally {
      setIsAgentTyping(false);
    }
	};

	const chatMessagesRef = useRef(null);

	const scrollToBottom = () => {
		if (chatMessagesRef.current) {
			chatMessagesRef.current.scrollTo({
				top: chatMessagesRef.current.scrollHeight,
				behavior: 'smooth'
			});
		}
	};

	useEffect(() => {scrollToBottom();}, [chatData, isAgentTyping]);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const toggleModal = () => setIsModalOpen(!isModalOpen);
	const closeModal = () => setIsModalOpen(false);
	
	return (
	<div className="flex flex-col items-end fixed max-w-full bottom-0 right-0 md:bottom-12 md:right-12 p-4 z-50 gap-2">
		
    {isModalOpen && <div className="modal flex flex-col w-full md:w-96 gap-2 mb-4 bg-white border rounded-lg shadow-lg ">
			<div className="flex flex-row items-center justify-between p-4 gap-2 border-b-1">
				<div className="flex flex-row items-center gap-2">
				<img src={movioProfilePic} alt="AI Avatar" className="w-12 h-12 rounded-full bg-primary-100" />
				<p className="text-secondary-500">Movio</p>
				</div>
				<button
					className="bg-transparent px-2 h-8 text-secondary-500"
					onClick={closeModal}
				>x</button>
			</div>
			<div className="flex flex-col p-4 gap-2 max-h-96 overflow-y-auto" ref={chatMessagesRef}>
				{chatData.map((chat, index) => {
					const isAgent = chat.sender === 'agent';
					return (
						<div key={`message-${index}`} className={`flex flex-col ${isAgent ? 'items-start mr-8' : 'items-end ml-8'} gap-1`}>
							<p className={`p-3 px-4 rounded-3xl font-light ${isAgent ? 'rounded-bl-none text-white bg-primary-500' : 'rounded-br-none text-secondary-700 bg-secondary-100'} text-sm`}>{chat.message}</p>
							<p className="text-sm text-primary-300 font-light italic">{isAgent ? 'Movio' : 'You'}</p>
						</div>
					);
				})}
				{isAgentTyping && (<div className="flex flex-col items-start mr-8 gap-1">
					<p className="p-3 px-4 rounded-3xl font-light rounded-bl-none text-white bg-primary-500 text-sm animate-pulse">Movio is typing...</p>
					<p className="text-sm text-primary-300 font-light italic">Movio</p>
				</div>)}
			</div>
			<div className="border-t-1 p-2">
				<form onSubmit={handleSubmit} className="flex flex-row items-center p-2 w-full">
					<input className="p-2 px-4 h-12 w-full text-secondary-500 rounded-3xl border-r-0 rounded-tr-none rounded-br-none" type="text" placeholder="Type your message..." value={userMessage} onChange={(e) => setUserMessage(e.target.value)} />
					<button className="bg-primary-500 text-white rounded-3xl rounded-tl-none rounded-bl-none" type="submit">Send</button>
				</form>
			</div>
		</div>}

		<button className="modal-button w-16 h-16 rounded-full " onClick={toggleModal}><ChatBotIcon /></button>
	</div>
    );
}