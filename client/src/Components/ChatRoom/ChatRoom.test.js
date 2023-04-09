// ChatRoom.test.js
import React, { createContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ChatRoom from "./ChatRoom";
import UserContext from "../Contexts/UserContext";
const mockUser = {
	id: 1,
};

const UserContextMock = ({ children }) => {
	return (
		<UserContext.Provider value={{ user: mockUser }}>
			{children}
		</UserContext.Provider>
	);
};

test("renders ChatRoom component without crashing", () => {
	const chatRoomObject = {
		id: "test-id",
		messages: [],
		chat_room_users: [{ user_id: mockUser.id }],
	};

	render(
		<UserContextMock>
			<ChatRoom
				chatRoomObject={chatRoomObject}
				setDisplayedMessages={() => {}}
				setSelectedChatRoomID={() => {}}
			/>
		</UserContextMock>
	);
});

test("displays correct information for the other user in the chat room", async () => {
	const chatRoomObject = {
		id: "test-id",
		messages: [],
		chat_room_users: [{ user_id: mockUser.id }, { user_id: 2 }],
	};

	const otherUser = {
		id: 2,
		profile_picture_url: "https://example.com/pic.jpg",
		artist_name: "Test Artist",
		user_type: { name: "Test Type" },
	};

	// Mock the fetch function to return the other user
	global.fetch = jest.fn(() =>
		Promise.resolve({
			json: () => Promise.resolve(otherUser),
		})
	);

	render(
		<UserContextMock>
			<ChatRoom
				chatRoomObject={chatRoomObject}
				setDisplayedMessages={() => {}}
				setSelectedChatRoomID={() => {}}
			/>
		</UserContextMock>
	);

	const imgElement = await screen.findByRole("img");
	expect(imgElement).toHaveAttribute("src", otherUser.profile_picture_url);

	const artistNameElement = screen.getByText(otherUser.artist_name);
	expect(artistNameElement).toBeInTheDocument();

	const userTypeElement = screen.getByText(otherUser.user_type.name);
	expect(userTypeElement).toBeInTheDocument();

	// Clean up the mocked fetch function
	global.fetch.mockRestore();
});
