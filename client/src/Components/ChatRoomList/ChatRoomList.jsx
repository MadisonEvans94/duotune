import React from "react";
import UserContext from "../Contexts/UserContext";
import { useContext } from "react";

import ChatRoom from "../ChatRoom/ChatRoom";
const ChatRoomList = () => {
	const { chatRoomObjects } = useContext(UserContext);

	return chatRoomObjects.length > 0 ? (
		<ul
			className="
				divide-gray-200 w-60 cursor-pointer
				lg:w-80
				xl:w-96">
			{chatRoomObjects.map((chatRoomObject, key) => (
				<ChatRoom key={key} chatRoomObject={chatRoomObject} />
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
