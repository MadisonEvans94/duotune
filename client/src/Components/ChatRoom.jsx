import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import UserContext from "./Contexts/UserContext";
const ChatRoom = ({ chatRoomObject, setDisplayedMessages }) => {
	const [otherUser, setOtherUser] = useState(null);
	const { user } = useContext(UserContext);

	console.log("CHATROOM COMPONENT: Chat room object: ", chatRoomObject);
	function populateChatRoom() {
		console.log(chatRoomObject);
		setDisplayedMessages(chatRoomObject.messages);
	}

	useEffect(() => {
		if (!chatRoomObject.chat_room_users) return;

		const usersInChat = chatRoomObject.chat_room_users;

		const otherChatRoomUser = usersInChat.find(
			(chatRoomUser) => chatRoomUser.user_id !== user.id
		);

		const fetchOtherUser = async () => {
			const data = await fetch(`/users/${otherChatRoomUser.user_id}`);
			const otherUser = await data.json();
			console.log("OTHER USER \n\n\n", otherUser);
			setOtherUser(otherUser);
		};
		fetchOtherUser().catch(console.error);
		console.log("CHATROOM COMPONENT: other user", otherUser);
	}, []);

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
