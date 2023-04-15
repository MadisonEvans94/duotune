import { useEffect, useContext } from "react";
import UserContext from "../../Components/Contexts/UserContext";
import MessageInput from "../../Components/MessageInput";
import ChatRoomList from "../../Components/ChatRoomList/ChatRoomList";
import MessageDisplay from "../../Components/MessageDisplay";
import ChatRoomLayout from "../../Components/Layouts/ChatRoomLayout";
export default function Matches() {
	const {
		user,
		chatRoomObjects,
		setChatRoomObjects,
		setChatRoomUserInstances,
	} = useContext(UserContext);

	const fetchChatRoomObjects = async () => {
		try {
			setChatRoomUserInstances(user.chat_rooms);
			if (user.chat_rooms.length > 0) {
				Promise.all(
					user.chat_rooms.map((instance) =>
						fetch(`/chat_rooms/${instance.chat_room_id}`).then((res) =>
							res.json()
						)
					)
				)
					.then((chatRoomsData) => {
						setChatRoomObjects(chatRoomsData);
					})
					.catch((error) =>
						console.error(
							"MATCHES COMPONENT: Error fetching chat rooms:",
							error
						)
					);
			} else {
				setChatRoomObjects([]);
			}
		} catch (error) {
			console.error("\n\nMATCHES COMPONENT: Error fetching data:", error);
		}
	};

	useEffect(() => {
		fetchChatRoomObjects();
	}, []);

	return (
		<ChatRoomLayout
			chatRoomObjects={chatRoomObjects}
			ChatRoomList={ChatRoomList}
			MessageDisplay={MessageDisplay}
			MessageInput={MessageInput}
		/>
	);
}
