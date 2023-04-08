import { useEffect, useState, useContext } from "react";
import UserContext from "../Components/Contexts/UserContext";
import matches from "../seed/matches.json";
import ChatRoomList from "../Components/ChatRoomList";
import ChatRoomContent from "../Components/ChatRoomContent";
import MatchCard from "../Components/MatchCard";

export default function Matches() {
	const [displayedMessages, setDisplayedMessages] = useState(null);
	const [chatRooms, setChatRooms] = useState(null);
	const { user } = useContext(UserContext);
	const [recipients, setRecipients] = useState(null);
	const [chatRoomUserInstances, setChatRoomUserInstances] = useState([]);

	const fetchChatRoomObjects = async () => {
		console.log("CURRENT USER STATE: ", user);
		try {
			setChatRoomUserInstances(user.chat_rooms);
			if (user.chat_rooms.length > 0) {
				Promise.all(
					user.chat_rooms.map((instance) =>
						fetch(`/chat_rooms/${instance.id}`).then((res) => res.json())
					)
				)
					.then((chatRoomsData) => {
						console.log("chatRoomsData", chatRoomsData);
						setChatRooms(chatRoomsData);
					})
					.catch((error) => console.error("Error fetching chat rooms:", error));
			} else {
				setChatRooms([]);
			}

			console.log(
				`\n\nMATCHES COMPONENT: user ${user.id}'s ChatRoomUser instances: `,
				user.chat_rooms
			);
		} catch (error) {
			console.error("\n\nMATCHES COMPONENT: Error fetching data:", error);
		}
	};

	useEffect(
		() =>
			console.log(
				`\n\nMATCHES COMPONENT: chat_room objects for user ${user.id} ("chatRooms" array): `,
				chatRooms
			),
		[chatRooms, user.id]
	);

	useEffect(() => {
		setRecipients([]);

		fetchChatRoomObjects();
	}, [user.chat_rooms]);

	return (
		<div className="h-full">
			<div className="h-[200px] flex flex-row overflow-x-auto w-screen">
				{matches &&
					matches.map((match, key) => <MatchCard key={key} match={match} />)}
			</div>
			<div className="flex flex-row h-[calc(100%-200px)]">
				{chatRooms && (
					<div className="border-r border-t">
						<ChatRoomList
							setDisplayedMessages={setDisplayedMessages}
							chatRooms={chatRooms}
							recipients={recipients}
						/>
					</div>
				)}
				<ChatRoomContent
					displayedMessages={displayedMessages}
					setDisplayedMessages={setDisplayedMessages}
				/>
			</div>
		</div>
	);
}
