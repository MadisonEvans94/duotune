import { useEffect, useState, useContext } from "react";
import UserContext from "../../Components/Contexts/UserContext";

import ChatRoomList from "../../Components/ChatRoomList/ChatRoomList";
import ChatRoomContent from "../../Components/ChatRoomContent";

export default function Matches() {
	const [displayedMessages, setDisplayedMessages] = useState(null);
	const {
		user,
		chatRoomObjects,
		setChatRoomObjects,
		selectedChatRoomID,
		setSelectedChatRoomID,
	} = useContext(UserContext);

	const [chatRoomUserInstances, setChatRoomUserInstances] = useState([]);

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
		<div className="h-full">
			<div className="flex flex-row h-full">
				{chatRoomObjects && (
					<div className="border-r border-t">
						<ChatRoomList
							selectedChatRoomID={selectedChatRoomID}
							setSelectedChatRoomID={setSelectedChatRoomID}
							setDisplayedMessages={setDisplayedMessages}
						/>
					</div>
				)}
				<ChatRoomContent
					selectedChatRoomID={selectedChatRoomID}
					setSelectedChatRoomID={setSelectedChatRoomID}
					chatRoomObject={chatRoomObjects[0]}
					displayedMessages={displayedMessages}
					setDisplayedMessages={setDisplayedMessages}
				/>
			</div>
		</div>
	);
}
