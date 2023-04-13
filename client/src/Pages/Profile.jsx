import React from "react";
import { useContext, useState } from "react";
import UserContext from "../Components/Contexts/UserContext";
import matches from "../seed/matches.json";
import { FaUserFriends as Connect } from "react-icons/fa";
import EditButton from "../Components/EditButton";
import ProfileInfoEditor from "../Components/ProfileInfoEditor";
import ArtistInfo from "../Components/ArtistInfo";
import ProfileContent from "../Components/ProfileContent";
const Profile = () => {
	const { user, chatRoomObjects } = useContext(UserContext);

	return (
		<>
			{user && (
				<>
					<div className="flex flex-row justify-center w-full h-full text-info">
						<ArtistInfo user={user} />
						<ProfileContent user={user} />
					</div>
				</>
			)}
		</>
	);
};

export default Profile;
