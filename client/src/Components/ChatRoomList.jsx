import React from "react";
import UserContext from "./Contexts/UserContext";
import { useContext, useState } from "react";

import ChatRoom from "./ChatRoom";
const ChatRoomList = ({ setDisplayedMessages, recipients, chatRooms }) => {
	const { user } = useContext(UserContext);
	const updatedRecipients = recipients.filter(
		(value) => value.user_id !== user.id
	);
	console.log(
		"\n\nCHATROOMLIST COMPONENT: \n'chatRooms':",
		chatRooms,
		"UpdatedRecipients: \n",
		updatedRecipients
	);

	return chatRooms.length > 0 ? (
		<ul
			className="
				divide-gray-200 w-60 cursor-pointer
				lg:w-80
				xl:w-96">
			{updatedRecipients.map((recipient, key) => (
				<ChatRoom
					key={key}
					recipient={recipient}
					chatRoom={chatRooms[key]}
					setDisplayedMessages={setDisplayedMessages}
				/>
			))}
		</ul>
	) : (
		<div
			className="
			divide-gray-200 w-60 text-info text-center flex flex-col justify-center items-center h-full text-xs font-thin
			lg:w-80
			xl:w-96">
			<p className="mb-4">You have 0 matches</p>
			<p>Match with a collaborator to start a conversation</p>
		</div>
	);
};

export default ChatRoomList;
