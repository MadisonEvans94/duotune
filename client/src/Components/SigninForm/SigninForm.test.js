import React from "react";
import { render, screen, within, fail } from "@testing-library/react";

import UserContext from "../Contexts/UserContext";
import AuthContext from "../Contexts/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import SigninForm from "./SigninForm";
import userEvent from "@testing-library/user-event";

global.fetch = jest.fn(() =>
	Promise.resolve({
		ok: true,
		json: () => Promise.resolve({ success: true }),
	})
);

const mockUserContextValue = {
	userID: null,
	setUserID: jest.fn(),
	user: null,
	setUser: jest.fn(),
	fetchUser: jest.fn(),
	chatRoomObjects: [],
	setChatRoomObjects: jest.fn(),
};

const mockAuthContextValue = {
	isLoggedIn: false,
	setIsLoggedIn: jest.fn(),
};
const toggler = jest.fn();
function renderWithContext(component) {
	return render(
		<Router>
			<UserContext.Provider value={mockUserContextValue}>
				<AuthContext.Provider value={mockAuthContextValue}>
					{component}
				</AuthContext.Provider>
			</UserContext.Provider>
		</Router>
	);
}

const signInForm = (
	<SigninForm toggler={toggler} setUser={() => {}} setIsLoggedIn={() => {}} />
);

it("renders signup form", async () => {
	renderWithContext(signInForm);
	const form = screen.getByText(/email/i);
	expect(form).toBeInTheDocument();
});

it("creates all the necessary inputs fields", async () => {
	// render with context
	renderWithContext(signInForm);
	// check for email address input
	const emailInput = screen.getByPlaceholderText(/enter email/i);
	// check for password input
	const passwordInput = screen.getByPlaceholderText(/enter password/i);
	// check for sign in button
	const signinButton = screen.getByRole("button", { name: /sign in/i });
	// check for toggler
	const toggler = screen.getByText("here");
});

it("handles input changes", () => {
	renderWithContext(signInForm);

	const emailInput = screen.getByPlaceholderText(/enter email/i);
	const passwordInput = screen.getByPlaceholderText(/enter password/i);

	userEvent.type(emailInput, "test@example.com");
	expect(emailInput).toHaveValue("test@example.com");

	userEvent.type(passwordInput, "password123");
	expect(passwordInput).toHaveValue("password123");
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

it("triggers the trigger function when user clicks on 'here'", () => {
	renderWithContext(signInForm);
	const toggleLink = screen.getByText("here");
	userEvent.click(toggleLink);
	expect(toggler).toHaveBeenCalled();
});
