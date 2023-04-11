import { useEffect, useState, useContext } from "react";
import UserContext from "../../Components/Contexts/UserContext";
import matches from "../../seed/matches.json";
import ChatRoomList from "../../Components/ChatRoomList/ChatRoomList";
import ChatRoomContent from "../../Components/ChatRoomContent";
import MatchCard from "../../Components/MatchCard";

export default function Matches() {
	const [displayedMessages, setDisplayedMessages] = useState(null);
	const { user, chatRoomObjects, setChatRoomObjects } = useContext(UserContext);
	const [recipients, setRecipients] = useState([]);
	const [chatRoomUserInstances, setChatRoomUserInstances] = useState([]);
	const [selectedChatRoomID, setSelectedChatRoomID] = useState(null);
	const [swipers, setSwipers] = useState(null);
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
	const fetchSwipers = () => {
		fetch(`/users/${user.id}`)
			.then((response) => response.json())
			.then((user) => console.log("USER SWIPES", user.swiper_swipes))
			.catch((error) => console.log("ERROR:", error));
	};

	useEffect(() => {
		fetchChatRoomObjects();
		fetchSwipers();
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
							selectedChatRoomID={selectedChatRoomID}
							setSelectedChatRoomID={setSelectedChatRoomID}
							setDisplayedMessages={setDisplayedMessages}
							chatRoomObjects={chatRoomObjects}
							recipients={recipients}
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
