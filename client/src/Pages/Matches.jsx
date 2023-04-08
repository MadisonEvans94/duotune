import { useEffect, useState, useContext } from "react";
import UserContext from "../Components/Contexts/UserContext";
import matches from "../seed/matches.json";
import ChatRoomList from "../Components/ChatRoomList";
import ChatRoomContent from "../Components/ChatRoomContent";
import MatchCard from "../Components/MatchCard";

export default function Matches() {
	const [displayedMessages, setDisplayedMessages] = useState(null);
	const { user, chatRoomObjects, setChatRoomObjects } = useContext(UserContext);
	const [recipients, setRecipients] = useState([]);
	const [chatRoomUserInstances, setChatRoomUserInstances] = useState([]);
	const [selectedChatRoom, setSelectedChatRoom] = useState(null);
	const fetchChatRoomObjects = async () => {
		console.log(
			"CURRENT USER STATE: ",
			user,
			"\n\nCURRENT USER CHATROOM OBJECTS: ",
			chatRoomObjects
		);
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
			<div className="h-[200px] flex flex-row overflow-x-auto w-screen">
				{matches &&
					matches.map((match, key) => <MatchCard key={key} match={match} />)}
			</div>
			<div className="flex flex-row h-[calc(100%-200px)]">
				{chatRoomObjects && (
					<div className="border-r border-t">
						<ChatRoomList
							selectedChatRoom={selectedChatRoom}
							setSelectedChatRoom={setSelectedChatRoom}
							setDisplayedMessages={setDisplayedMessages}
							chatRoomObjects={chatRoomObjects}
							recipients={recipients}
						/>
					</div>
				)}
				<ChatRoomContent
					selectedChatRoom={selectedChatRoom}
					setSelectedChatRoom={setSelectedChatRoom}
					chatRoomObject={chatRoomObjects[0]}
					displayedMessages={displayedMessages}
					setDisplayedMessages={setDisplayedMessages}
				/>
			</div>
		</div>
	);
}
