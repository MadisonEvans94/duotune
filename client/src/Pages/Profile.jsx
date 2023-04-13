import React from "react";
import { useContext } from "react";
import UserContext from "../Components/Contexts/UserContext";
import ArtistInfo from "../Components/ArtistInfo";
import ProfileContent from "../Components/ProfileContent";
const Profile = () => {
	const { user } = useContext(UserContext);

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
