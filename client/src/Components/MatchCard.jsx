import React from "react";

const MatchCard = ({ match }) => {
	return (
		<div
			className="
            group cursor-pointer min-w-[200px] m-4 rounded overflow-hidden relative">
			<div className="absolute w-full h-full bg-[#000000aa] flex flex-row opacity-0 group-hover:opacity-100  transition-opacity duration-300">
				<div className="w-full my-auto text-white text-center">
					<h2 className="text-xl">{match.artist_name}</h2>
					<p className="text-sm">{match.user_type.name}</p>
				</div>
			</div>
			<img
				className="w-full h-full object-cover"
				src={match.profile_picture_url}
				alt={match.artist_name}
			/>
		</div>
	);
};

export default MatchCard;
