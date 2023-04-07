import React from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
const ChatRoom = ({
	chatRoom,
	setMessages,
	recipient,
	chatRoomMessages,
	setChatRoomMessages,
}) => {
	const [otherUser, setOtherUser] = useState(null);

	function populateChatRoom() {
		setMessages(chatRoomMessages);

		fetch(`/chat_rooms/${chatRoom.id}`)
			.then((res) => res.json())
			.then((chatRoomInstance) => {
				setChatRoomMessages(chatRoomMessages);
				setMessages(chatRoomInstance.messages);
			});
	}

	useEffect(() => {
		fetch(`/users/${recipient}`)
			.then((res) => res.json())
			.then((user) => {
				setOtherUser(user);
			})
			.catch((error) => console.log("CHATROOM COMPONENT: ", error));
	}, [recipient]);

	return (
		otherUser && (
			<motion.li
				initial={{ x: 0 }}
				whileHover={{ x: 10 }}
				onClick={populateChatRoom}
				className="py-4 flex flex-row pl-2">
				<img
					className="h-10 w-10 rounded-full object-cover"
					src={otherUser.profile_picture_url}
					alt="placeholder"
				/>
				<div className="ml-3">
					<p className="text-sm font-medium text-info">
						{otherUser.artist_name}
					</p>
					<p className="text-xs text-accent">{otherUser.user_type.name}</p>
				</div>
			</motion.li>
		)
	);
};

export default ChatRoom;
