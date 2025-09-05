import { useState, useEffect } from 'react';

const mockChatData = [
	{ sender: 'agent', contents: 'Hello! How can I assist you today?' },
	{ sender: 'user', contents: 'Can you recommend a movie for me?' },
	{ sender: 'agent', contents: 'Sure! What kind of mood are you in today?' },
	{ sender: 'user', contents: 'I am feeling very angsty' },
	{ sender: 'agent', contents: 'Thank you! Let me find a movie that matches your mood.' },
];

export const AiChat = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = () => setIsModalOpen(!isModalOpen);
	const closeModal = () => setIsModalOpen(false);

	const [userMessage, setUserMessage] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		mockChatData.push({ sender: 'user', contents: userMessage });
		setUserMessage('');
	}
	
	return (
		<div className="flex flex-col items-end fixed bottom-12 right-12 z-50 gap-2">
		
    {isModalOpen && <div className="modal flex flex-col w-96 gap-2 mb-4 bg-white border rounded-lg shadow-lg ">
			<div className="flex flex-row items-center justify-between p-4 gap-2">
				<img src="" alt="AI Avatar" className="w-8 h-8 rounded-full bg-primary-100" />
				<p className="text-secondary-500">AI Avatar Name</p>
				<button
					className="bg-transparent px-2 h-8 text-secondary-500"
					onClick={closeModal}
				>x</button>
			</div>
			<div className="flex flex-col p-4 gap-2 max-h-64 overflow-y-auto">
				{mockChatData.map((message, index) => {
					const isAgent = message.sender === 'agent';
					return (
						<div key={`message-${index}`} className={`flex flex-col ${isAgent ? 'items-start mr-8' : 'items-end ml-8'} gap-1`}>
							<p className={`p-2 px-4 rounded-3xl ${isAgent ? 'rounded-bl-none text-white bg-primary-500' : 'rounded-br-none text-secondary-700 bg-secondary-300'} text-sm`}>{message.contents}</p>
							<p className="text-sm text-primary-300">{isAgent ? 'Agent' : 'User'}</p>
						</div>
					);
				})}
			</div>
			<div className="">
				<form onSubmit={handleSubmit} className="flex flex-row items-center p-2 w-full">
					<input className="p-2 px-4 h-12 w-full text-secondary-500 rounded-3xl border-r-0 rounded-tr-none rounded-br-none text-sm" type="text" placeholder="Type your message..." value={userMessage} onChange={(e) => setUserMessage(e.target.value)} />
					<button className="bg-primary-500 text-white rounded-3xl rounded-tl-none rounded-bl-none" type="submit">Send</button>
				</form>
			</div>
		</div>}

		{/* Placeholder for the AI Chat Bubble */}
		<button className="modal-button w-16 h-16 rounded-full " onClick={toggleModal}>AI</button>
		</div>
    );
}