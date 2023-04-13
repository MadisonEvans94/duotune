import React from "react";

const ArtistInfo = ({ user }) => {
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
};

export default ArtistInfo;
