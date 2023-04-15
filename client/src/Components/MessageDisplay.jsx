import React from "react";
import { useContext, useEffect } from "react";
import UserContext from "./Contexts/UserContext";
import MessageBubble from "./MessageBubble";
const MessageDisplay = () => {
	const { user, displayedMessages, setDisplayedMessages } =
		useContext(UserContext);

	useEffect(() => {}, [setDisplayedMessages, displayedMessages]);
	return (
		<div className="h-full w-full">
			{displayedMessages && (
				<div className="px-6">
					{displayedMessages.map((message, index) => {
						const isUser = message.sender_id === user.id;
						return (
							<MessageBubble
								key={index}
								index={index}
								isUser={isUser}
								content={message.content}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default MessageDisplay;
