import React from "react";
import { useState } from "react";
import ProfileInfoEditor from "./ProfileInfoEditor";
import RecentMatches from "./RecentMatches";
import EditButton from "./EditButton";
const ProfileContent = ({ user }) => {
	const [showBioEditor, setShowBioEditor] = useState(false);
	const [showSongEditor, setShowSongEditor] = useState(false);
	const [showUserTypeEditor, setShowUserTypeEditor] = useState(false);

	function toggleBioEditor() {
		console.log("edit clicked");
		setShowBioEditor((prev) => !prev);
	}
	const patchBio = async (value) => {
		const newBio = value;
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
	function toggleSongEditor() {
		setShowSongEditor((prev) => !prev);
	}
	const patchSong = async () => {
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
					<EditButton callback={toggleBioEditor} buttonText="Edit Bio" />
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
					<EditButton callback={toggleSongEditor} buttonText="Edit Song Demo" />
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
	);
};

export default ProfileContent;
