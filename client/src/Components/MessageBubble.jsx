import React from "react";

const MessageBubble = ({ index, isUser, content }) => {
	return (
		<div
			key={index}
			className={`flex flex-row ${
				isUser ? "justify-end" : "justify-start"
			} mb-4`}>
			<p
				className={`px-4 py-2 rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${
					isUser ? "bg-accent text-info" : "bg-gray-200 text-dark"
				}`}>
				{content}
			</p>
		</div>
	);
};

export default MessageBubble;
