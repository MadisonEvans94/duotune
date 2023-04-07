import { useEffect, useState, useContext } from "react";
import UserContext from "../Components/Contexts/UserContext";
import matches from "../seed/matches.json";
import ChatRoomList from "../Components/ChatRoomList";
import ChatRoomContent from "../Components/ChatRoomContent";
import MatchCard from "../Components/MatchCard";

export default function Matches() {
	const [messages, setMessages] = useState(null);
	const [chatRooms, setChatRooms] = useState(null);
	const { user } = useContext(UserContext);
	const [recipients, setRecipients] = useState(null);

	useEffect(() => {
		setChatRooms(user.chat_rooms);
		const chatroomIdList = user.chat_rooms.map((chatroom) => chatroom.id);
		setRecipients(chatroomIdList);
		const fetchData = async () => {
			try {
				const chatroomResponse = await fetch(
					`/chat_rooms/${user.chat_rooms[0].id}`
				);
				const chatroomInstance = await chatroomResponse.json();

				setMessages(chatroomInstance.messages);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [user.chat_rooms, user.id]);

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
							setMessages={setMessages}
							chatRooms={chatRooms}
							recipients={recipients}
						/>
					</div>
				)}
				<ChatRoomContent messages={messages} setMessages={setMessages} />
			</div>
		</div>
	);
}
