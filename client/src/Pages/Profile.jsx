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
						{ArtistInfo()}

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

	function ArtistInfo() {
		return (
			<div className="w-1/3 h-full p-4 flex flex-col justify-start">
				<div className="overflow-hidden relative rounded-md text-primary h-[460px] flex flex-col justify-end">
					<img
						src={user.profile_picture_url}
						alt="prof pic"
						className="w-full h-full absolute object-cover"
					/>
					<div className="w-full h-full absolute bg-gradient-to-t from-[#00000055] to-fuchsia-[#00000000]" />
				</div>
				<div className="z-50 px-4">
					<h1 className="text-4xl font-display mt-6 text-info">
						{user.artist_name}
					</h1>
					<p className="my-2 font-thin italic">{user.user_type.name}</p>
				</div>
				<ul className="text-sm p-4 rounded-md h-1/4 flex flex-col justify-start mb-4 font-thin text-accent">
					<li>{user.location}</li>
					<li>hip hop</li>
					<li>Searching for a user.in_search_of</li>
				</ul>
			</div>
		);
	}
};

export default Profile;
