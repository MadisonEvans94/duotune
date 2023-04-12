import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import AuthContext from "../Components/Contexts/AuthContext";
import UserContext from "../Components/Contexts/UserContext";
import { motion } from "framer-motion";
import MorphingBlob from "../Components/MorphingBlob";
import SignupForm from "../Components/SignupForm";
import SigninForm from "../Components/SigninForm";

const Signin = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [signupForm, setSignupForm] = useState(true);
	const { setUser } = useContext(UserContext);
	const { setIsLoggedIn } = useContext(AuthContext);
	function toggleSignup() {
		setSignupForm((prev) => !prev);
	}
	function handleSignin(e) {
		e.preventDefault();
		const userData = {
			email: email,
			password: password,
		};

		fetch("/signin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
			credentials: "include",
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error("\n\nSIGNIN COMPONENT: Authentication failed");
				}
			})
			.then((user) => {
				setUser(user);
				setIsLoggedIn(true); // Update the loggedIn state in the AuthProvider
				console.log(`\n\nSIGNIN COMPONENT: Login was successful...`, user);
				navigate("/explore");
			})
			.catch((error) => console.log(`\n\nSIGNIN COMPONENT: `, error));
	}

	return (
		<>
			<div className="flex min-h-full text-info relative">
				{signupForm ? (
					<SigninForm submissionHandler={handleSignin} toggler={toggleSignup} />
				) : (
					<SignupForm submissionHandler={handleSignin} toggler={toggleSignup} />
				)}

				<h1 className="absolute top-[40%] text-[100px] z-10 w-full text-right text-info font-display pr-[25%]">
					DuoTune
				</h1>
				<div className="absolute w-full h-full ml-[300px]">
					<Canvas className="">
						<ambientLight intensity={0.75} />
						<MorphingBlob />
					</Canvas>
				</div>
			</div>
		</>
	);
};

export default Signin;
