import Matches from "./Pages/Matches/Matches";
import Explore from "./Pages/Explore";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import Settings from "./Pages/Settings";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./Pages/Signin";
import { useState, useEffect } from "react";
import UserContext from "./Components/Contexts/UserContext";
import AuthContext from "./Components/Contexts/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
	const [userID, setUserID] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);
	const [selectedChatRoomID, setSelectedChatRoomID] = useState(null);
	const [chatRoomObjects, setChatRoomObjects] = useState([]);
	function fetchUser(id, callback) {
		fetch(`/users/${id}`)
			.then((res) => res.json())
			.then((user) => callback(user));
	}
	useEffect(() => {
		fetch("/authorized", {
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
			if (res.ok) {
				res.json().then((user) => {
					setUser(user);
					setUserID(user.id);
					setIsLoggedIn(true);

					setLoading(false);
				});
			} else {
				setUserID(null);
				setIsLoggedIn(false);
				setLoading(false);
			}
		});
	}, [userID, isLoggedIn]);

	return (
		<div className="w-screen h-screen relative bg-primary font-paragraph">
			<UserContext.Provider
				value={{
					userID,
					setUserID,
					user,
					setUser,
					fetchUser,
					chatRoomObjects,
					setChatRoomObjects,
					selectedChatRoomID,
					setSelectedChatRoomID,
				}}>
				<AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
					<Router>
						<Routes>
							<Route path="/signin" element={<Signin />} />
							<Route path="/" element={<ProtectedRoute loading={loading} />}>
								<Route path="/profile" element={<Profile />} />
								<Route path="/settings" element={<Settings />} />
								<Route path="/about" element={<About />} />
								<Route path="/explore" element={<Explore />} />
								<Route path="/matches" element={<Matches />} />
							</Route>
						</Routes>
					</Router>
				</AuthContext.Provider>
			</UserContext.Provider>
		</div>
	);
}

export default App;
