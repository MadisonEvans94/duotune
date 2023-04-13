import React from "react";
import { useContext, useState } from "react";
import RecentMatches from "../Components/RecentMatches";
import UserContext from "../Components/Contexts/UserContext";
import { motion, AnimatePresence } from "framer-motion";
import colors from "../utils/colorPalette";
import matches from "../seed/matches.json";
import { FaUserFriends as Connect } from "react-icons/fa";
import EditButton from "../Components/EditButton";
import ProfileInfoEditor from "../Components/ProfileInfoEditor";
import ArtistInfo from "../Components/ArtistInfo";
const Profile = () => {
	const { user, chatRoomObjects } = useContext(UserContext);
	const [showBioEditor, setShowBioEditor] = useState(false);
	const [showSongEditor, setShowSongEditor] = useState(false);
	const [showUserTypeEditor, setShowUserTypeEditor] = useState(false);
	console.log(
		"PROFILE STUFF \n\n\n",
		"user:",
		user,
		"userID:",
		user.id,
		"chatRoomObjects:",
		chatRoomObjects
	);
	// TODO: bio editor
	function toggleBioEditor() {
		console.log("edit clicked");
		setShowBioEditor((prev) => !prev);
	}
	const patchBio = async () => {
		const newBio = "this is my new bio";
		const requestBody = {
			bio: newBio,
		};
		const requestOptions = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(requestBody),
			credentials: "include",
		};
		const response = await fetch(`/users/${user.id}`, requestOptions);
		const jsonResponse = await response.json();
		console.log(jsonResponse);
		toggleBioEditor();
	};

	// TODO: Song editor --> need to find workaround for how db is set up
	function toggleSongEditor() {
		setShowSongEditor((prev) => !prev);
	}
	const patchSong = async () => {
		//
		const newSong = "new song url? ";
		const requestBody = {
			song_sample: newSong,
		};
		const requestOptions = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(requestBody),
			credentials: "include",
		};

		console.log("patch clicked\n", "need to find workaround for db");
		toggleSongEditor();
	};

	// TODO: UserType Editor
	function toggleUserTypeEditor() {
		console.log("edit clicked");
		setShowUserTypeEditor((prev) => !prev);
	}
	const patchUserType = async () => {
		const newUserTypeID = 3;
		const requestBody = {
			user_type_id: newUserTypeID,
		};
		const requestOptions = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(requestBody),
			credentials: "include",
		};
		const response = await fetch(`/users/${user.id}`, requestOptions);
		const jsonResponse = await response.json();
		console.log(jsonResponse);
		toggleUserTypeEditor();
	};

	return (
		<>
			{user && (
				<>
					<div className="flex flex-row justify-center w-full h-full text-info">
						<ArtistInfo user={user} />

						<div
							className="w-2/3 h-full pr-4 flex flex-col justify-start 
							xl:w-[900px]">
							<h2 className="text-2xl my-4 font-display text-center text-accent">
								Bio
							</h2>

							<div className="relative p-4 h-[150px] flex flex-col justify-around rounded-lg  border-accent border transition">
								{showBioEditor ? (
									<ProfileInfoEditor
										patchFunction={patchBio}
										placeHolderText="Update Bio"
									/>
								) : (
									user.bio
								)}

								<div className="absolute right-0 -top-10 my-2">
									<EditButton
										callback={toggleBioEditor}
										buttonText="Edit Bio"
									/>
								</div>
							</div>

							<h2 className="text-2xl my-4 font-display text-center text-accent">
								My Sound
							</h2>

							<div className="relative p-4 h-[150px] flex flex-col justify-around rounded-lg border-accent border transition">
								{showSongEditor ? (
									<ProfileInfoEditor patchFunction={patchSong} />
								) : (
									<p>{user.song_sample}</p>
								)}
								<div className="absolute right-0 -top-10 my-2">
									<EditButton
										callback={toggleSongEditor}
										buttonText="Edit Song Demo"
									/>
								</div>
							</div>

							<h2 className="text-2xl my-4 font-display text-center text-accent">
								User Type
							</h2>
							{/* <Connect className="mx-4" size="1.5em" /> */}
							<div className="relative p-4 h-[150px] flex flex-col justify-around rounded-lg border-accent border transition">
								{showUserTypeEditor ? (
									<ProfileInfoEditor patchFunction={patchUserType} />
								) : (
									<p>{user.user_type.name}</p>
								)}
								<div className="absolute right-0 -top-10 my-2">
									<EditButton
										callback={toggleUserTypeEditor}
										buttonText="Edit User Type"
									/>
								</div>
							</div>
							<RecentMatches />
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Profile;
