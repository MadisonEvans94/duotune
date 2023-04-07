import React from "react";
import Navigation from "../Pages/Navigation";

const ProtectedLayout = ({ children }) => {
	return (
		<>
			<Navigation />
			<main>{children}</main>
		</>
	);
};

export default ProtectedLayout;
