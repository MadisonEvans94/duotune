import React from "react";
import { render, screen } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import UserContext from "../Contexts/UserContext";
import AuthContext from "../Contexts/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Profile from "../../Pages/Profile";

const profile = <Profile />;

const user = {
	artist_name: "Blue Cloud",
	bio: "Im a producer from Arizona",
	chat_rooms: [],
	created_at: "2023-04-11 21:17:49",
	email: "m.corbinevans@gmail.com",
	experience_level: "Advanced",
	first_name: "Madison",
	id: 1,
	last_name: "Evans",
	location: "482 Juan Pike\nNew Jeremiah, RI 24051",
	profile_picture_url:
		"https://res.cloudinary.com/degnyqukw/image/upload/v1680801655/IMG_4344_n4ytjt.jpg",
	song_sample: null,
	swiped_swipes: [],
	swiper_swipes: [],
	updated_at: null,
	user_type: {
		id: 1,
		name: "Musician",
	},
	user_type_id: 1,
};

const mockUserContextValue = {
	userID: user.id,
	setUserID: jest.fn(),
	user: user,
	setUser: jest.fn(),
	fetchUser: jest.fn(),
	chatRoomObjects: [],
	setChatRoomObjects: jest.fn(),
};

const mockAuthContextValue = {
	isLoggedIn: true,
	setIsLoggedIn: jest.fn(),
};

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

it("renders correct section titles to the screen", async () => {
	renderWithContext(profile);
	const bioButton = screen.queryByRole("button", { name: /edit bio/i });
	const songButton = screen.queryByRole("button", { name: /edit song/i });
	const userTypeButton = screen.queryByRole("button", {
		name: /edit user type/i,
	});
	const bioTitle = screen.queryByRole("heading", { name: /bio/i });
	const mySoundTitle = screen.queryByRole("heading", { name: /My sound/i });
	const userTypeTitle = screen.queryByRole("heading", { name: /User Type/i });
	const recentMatchesTitle = screen.queryByRole("heading", {
		name: /Recent Matches/i,
	});

	const items = [
		bioButton,
		songButton,
		userTypeButton,
		bioTitle,
		mySoundTitle,
		userTypeTitle,
		recentMatchesTitle,
	];
	items.forEach((item) => {
		expect(item).toBeInTheDocument();
	});
});

it("populates the page with user's data", () => {
	renderWithContext(profile);
	const bioContent = screen.queryByText(/im a producer from arizona/i);
	expect(bioContent).toBeInTheDocument();
});
