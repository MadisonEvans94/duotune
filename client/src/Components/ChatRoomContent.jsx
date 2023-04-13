import React, { useState } from "react";
import { FaTelegramPlane as Send } from "react-icons/fa";
import colors from "../utils/colorPalette";
import { motion } from "framer-motion";
import { useContext } from "react";
import UserContext from "./Contexts/UserContext";
const ChatRoomContent = ({
	displayedMessages,
	setDisplayedMessages,
	selectedChatRoomID,
}) => {
	const [formMessage, setFormMessage] = useState("");
	const { user, chatRoomObjects } = useContext(UserContext);

	console.log("SELECTED CHAT ROOM ------->>> : ", selectedChatRoomID);
	console.log("CHATROOM OBJECTS ------->>> : ", chatRoomObjects);
	const handleInputChange = (e) => {
		setFormMessage(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const message = {
			content: formMessage,
			chat_room_id: selectedChatRoomID,
			sender_id: user.id,
		};

		try {
			const response = await fetch("/messages", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(message),
			});

			if (!response.ok) {
				throw new Error("\n\nCHATROOM COMPONENT: Error sending message.");
			}

			const newMessage = await response.json();
			setDisplayedMessages((prevMessages) =>
				prevMessages ? [...prevMessages, newMessage] : [newMessage]
			);

			setFormMessage("");
		} catch (error) {
			console.error("\n\nCHATROOMCONTENT COMPONENT: Error:", error);
		}
	};

	return (
		<div className="w-full pt-4 h-full flex flex-col border-t">
			{displayedMessages ? (
				<div className="px-4 sm:px-6 w-full h-0 flex-grow even:p-6 overflow-y-auto">
					{displayedMessages.map((message, index) => {
						const isUser = message.sender_id === user.id;
						return (
							<div
								key={index}
								className={`flex flex-row ${
									isUser ? "justify-end" : "justify-start"
								} mb-4`}>
								<p
									className={`px-4 py-2 rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${
										isUser ? "bg-accent text-info" : "bg-gray-200 text-dark"
									}`}>
									{message.content}
								</p>
							</div>
						);
					})}
				</div>
			) : (
				<div className="px-4 sm:px-6 w-full h-0 flex-grow even:p-6 overflow-y-auto  flex flex-col justify-center items-center">
					<div className="p-32 rounded-lg text-accent font-thin italic">
						{" "}
						No Messages ...
					</div>
				</div>
			)}
			<form
				onSubmit={handleSubmit}
				className="border-t w-full flex flex-row justify-center">
				<input
					className="border h-12 w-4/5 my-4 rounded-3xl px-6 xl:my-10"
					type="text"
					placeholder="message ..."
					value={formMessage}
					onChange={handleInputChange}
				/>
				<motion.button
					initial={{
						color: colors.accent,
						filter: "drop-shadow(0px 0px 0px rgba(0, 0, 0, 1))",
						transition: { duration: 0.1, type: "linear" },
					}}
					whileTap={{
						color: colors.info,
						filter: "drop-shadow(8px 5px 0px rgba(0, 0, 0, 1))",
					}}
					whileHover={{
						color: colors.info,
						filter: "drop-shadow(12px 8px 0px rgba(0, 0, 0, 1))",
						transition: { duration: 0.05, type: "linear" },
					}}
					type="submit"
					title="submit"
					className="
                    bg-none rounded-3xl my-auto ml-6 h-fit p-2 mx-3 text-light
                    ">
					<Send
						size="3em"
						className=""
						style={{
							transform: "translateX(-5%)",
						}}
					/>
				</motion.button>
			</form>
		</div>
	);
};

export default ChatRoomContent;
