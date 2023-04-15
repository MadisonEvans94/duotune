import React from "react";
import { useState, useContext } from "react";
import UserContext from "./Contexts/UserContext";
import colors from "../utils/colorPalette";
import { FaTelegramPlane as Send } from "react-icons/fa";
import { motion } from "framer-motion";

const MessageInput = () => {
	const [formMessage, setFormMessage] = useState("");

	const {
		user,
		selectedChatRoomID,
		setDisplayedMessages,
		addMessageToChatRoom,
	} = useContext(UserContext);
	console.log(selectedChatRoomID);
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

			addMessageToChatRoom(selectedChatRoomID, newMessage);
			setDisplayedMessages((prevMessages) =>
				prevMessages ? [...prevMessages, newMessage] : [newMessage]
			);
			setFormMessage("");
		} catch (error) {
			console.error("\n\nCHATROOMCONTENT COMPONENT: Error:", error);
		}
	};
	return (
		<form
			onSubmit={handleSubmit}
			className="
            border-t w-full flex flex-row justify-center">
			<input
				className="
                border h-12 w-4/5 my-4 rounded-3xl px-6 xl:my-10"
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
	);
};

export default MessageInput;
