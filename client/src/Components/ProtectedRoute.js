import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "./Contexts/AuthContext";
import Navigation from "../Pages/Navigation";
import { useContext } from "react";
const ProtectedRoute = ({ loading }) => {
	const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
	if (loading) {
		return (
			<>
				<div>Loading...</div>
			</>
		);
	} else if (isLoggedIn && !loading) {
		return (
			<>
				<Navigation setIsLoggedIn={setIsLoggedIn} />
				<div className="h-[calc(100%-64px)] flex flex-col">
					<Outlet />
				</div>
			</>
		);
	} else if (!isLoggedIn && !loading) {
		return <Navigate to="/signin" />;
	}
};

export default ProtectedRoute;
