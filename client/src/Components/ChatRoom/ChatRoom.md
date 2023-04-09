# Testing ChatRoom Component with React Testing Library

This guide assumes that you have a basic understanding of React and will focus on explaining the React Testing Library-specific code.

## 1. Importing Dependencies

```jsx
import React, { createContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ChatRoom from "./ChatRoom";
```

- We import `createContext` from React to create a mock `UserContext`.
- `render` is used to render a component for testing.
- `screen` is a utility to query elements within the rendered component.
- `fireEvent` is a utility to simulate user interactions, like clicks.
- `userEvent` is a higher-level utility to simulate user interactions.
- We import `@testing-library/jest-dom` to use custom Jest matchers for DOM assertions.

## 2. Creating a Mock UserContext.Provider

```jsx
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
```

- We create a mock `UserContext.Provider` to wrap our component during testing. This is necessary because the component uses the `useContext` hook.

## 2. Writing Test Cases

### a. Testing if the Component Renders

```jsx
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
```

- We use the `render` function to render the component.
- We pass the required props to the component.
- We wrap the component with the `UserContextMock` to provide the necessary context.

### b. Testing Display of Correct Information

```jsx
test("displays correct information for the other user in the chat room", async () => {
	// ...
	// Create mock data for chatRoomObject and otherUser

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
```

- We use `global.fetch` to mock the fetch function to return the otherUser data.
- We use `await screen.findByRole('img')` to find the `img` element in the rendered component. The `await` is used because the `img` element may not be immediately available due to the asynchronous fetch call

To run the tests, follow these steps:

1. Ensure that your test file has the correct naming convention, like ChatRoom.test.js (the .test.js suffix is important).

2. Open a terminal in your project's root directory.

3. Run the following command:

`npm test`

This command will start Jest in watch mode, and it will automatically run the tests in your project. Any time you make changes to your test files, Jest will re-run the tests.

If you want to run the tests only once without watch mode, you can use:
`npm run test --watchAll=false`
