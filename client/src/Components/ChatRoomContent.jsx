import React, { useState } from "react";
import { FaTelegramPlane as Send } from "react-icons/fa";
import colors from "../utils/colorPalette";
import { motion } from "framer-motion";
import { useContext } from "react";
import UserContext from "./Contexts/UserContext";
const ChatRoomContent = ({ messages, setMessages }) => {
	console.log("messages", messages);
	const [formMessage, setFormMessage] = useState("");
	const { user } = useContext(UserContext);
	const handleInputChange = (e) => {
		setFormMessage(e.target.value);
	};

	// def post(self):
	//     data = request.get_json()
	//     content = data.get("content")
	//     chat_room_id = data.get("chat_room_id")
	//     sender_id = data.get("sender_id")

	//     new_message = Message(content=content, sender_id=sender_id, chat_room_id=chat_room_id)
	//     db.session.add(new_message)
	//     db.session.commit()

	//     response = make_response(
	//         jsonify(new_message.to_dict()),
	//         201
	//     )
	//     return response

	const handleSubmit = async (e) => {
		e.preventDefault();
		const message = {
			content: formMessage,
			chat_room_id: 1,
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
				throw new Error("Error sending message.");
			}

			const newMessage = await response.json();

			setMessages((prevMessages) =>
				prevMessages ? [...prevMessages, newMessage] : [newMessage]
			);
			setFormMessage("");
		} catch (error) {
			console.error("Error:", error);
		}
	};
	return (
		<div className="w-full pt-4 h-full flex flex-col border-t">
			{messages ? (
				<div className="px-4 sm:px-6 w-full h-0 flex-grow even:p-6 overflow-y-auto">
					{messages.map((message, index) => {
						const isUser = message.sender_id === user.id;
						return (
							<div
								key={index}
								className={`flex ${
									isUser ? "justify-end" : "justify-start"
								} mb-4`}>
								<div
									className={`px-4 py-2 rounded-lg ${
										isUser ? "bg-accent text-info" : "bg-gray-200 text-dark"
									}`}>
									{message.content}
								</div>
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
					className="border h-12 w-4/5 my-4 rounded-3xl px-6"
					type="text"
					placeholder="message ..."
					value={formMessage}
					onChange={handleInputChange}
				/>
				<motion.button
					initial={{ scale: 1, color: colors.info }}
					whileHover={{ scale: 1.25, color: colors.accent }}
					type="submit"
					title="submit"
					className="
                    bg-none rounded-3xl my-4 h-fit p-2 mx-3 text-light
                    ">
					<Send
						size="2em"
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
