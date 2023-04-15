import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import UserContext from "../Contexts/UserContext";
const ChatRoom = ({ chatRoomObject }) => {
	const [otherUser, setOtherUser] = useState(null);
	const { user, setDisplayedMessages, setSelectedChatRoomID } =
		useContext(UserContext);

	function populateChatRoom() {
		setSelectedChatRoomID(chatRoomObject.id);
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
			setOtherUser(otherUser);
		};
		fetchOtherUser().catch(console.error);
	}, [chatRoomObject.chat_room_users, user.id]);

	return (
		otherUser && (
			<motion.li
				data-testid="chatRoom"
				initial={{ x: 0 }}
				whileHover={{ x: 10 }}
				onClick={populateChatRoom}
				className="font-display py-4 flex flex-row pl-2">
				<img
					className="h-10 w-10 rounded-full object-cover xl:h-20 xl:w-20"
					src={otherUser.profile_picture_url}
					alt="placeholder"
				/>
				<div className="ml-3 flex flex-col justify-center items-center xl:ml-6">
					<p className="text-sm font-medium text-info xl:text-xl ">
						{otherUser.artist_name}
					</p>
					<p className="text-xs text-accent">{otherUser.user_type.name}</p>
				</div>
			</motion.li>
		)
	);
};

export default ChatRoom;
