import React from "react";

import { useContext } from "react";
import UserContext from "./Contexts/UserContext";
const ChatRoomContent = ({
	displayedMessages,
	setDisplayedMessages,
	selectedChatRoomID,
}) => {
	const { user, chatRoomObjects } = useContext(UserContext);

	console.log("SELECTED CHAT ROOM ------->>> : ", selectedChatRoomID);
	console.log("CHATROOM OBJECTS ------->>> : ", chatRoomObjects);

	return (
		<div className="h-full">
			{displayedMessages ? (
				<div className="px-4 sm:px-6 w-full h-0 flex-grow even:p-6 overflow-y-auto">
					{displayedMessages.map((message, index) => {
						const isUser = message.sender_id === user.id;
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
									{message.content}
								</p>
							</div>
						);
					})}
				</div>
			) : (
				<div className="px-4 sm:px-6 w-full h-0 flex-grow even:p-6 overflow-y-auto  flex flex-col justify-center items-center">
					<div className="p-32 rounded-lg text-accent font-thin italic">
						{" "}
						No Messages ...
					</div>
				</div>
			)}
		</div>
	);
};

export default ChatRoomContent;
